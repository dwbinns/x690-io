// See x690
// https://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf

const {asBuffer, toHex} = require('buffer-io');
const {size, interpretEncoding, Encoding, read, write, bytes} = require('structured-io');
const fs=require('fs');


function integerSplit(integer, bits=8) {
    let bytes=[];
    let mask = (1<<bits)-1;
    while (integer>0) {
        bytes.unshift((integer & mask) | (bits<8 && bytes.length>0 ? 128 : 0));
        integer>>=bits;
    }
    return bytes;
}

const variableWidthNumber=new class extends Encoding {
    read(bufferReader, context, value) {
        value=0;
        while (true) {
            value<<=7;
            let byte = bufferReader.readU8();
            value |= byte & 0x7f;
            if (!(byte & 0x80)) break;
        }
        return value;
    }
    write(bufferWriter, context, value) {
        integerSplit(value,7).forEach(v=>bufferWriter.writeU8(v));
    }
};

const x690sizeEncoding=new class extends Encoding {
    read(bufferReader, context, value) {
        let length=bufferReader.readU8();
        if (length==0x80) {
            throw new Error("Indefinite length not legal in x690 DER");
        }
        let size =0;
        if (length>0x80) {
            for (let i=0; i<(length & 0x7f); i++) {
                let byte=bufferReader.readU8();
                size=(size << 8) + byte;
            }
        } else {
            size=length;
        }
        return size;
    }
    write(bufferWriter, context, value) {
        if (value<0x80) {
            bufferWriter.writeU8(value);
        } else {
            let sizeBytes=integerSplit(value);
            bufferWriter.writeU8(sizeBytes.length);
            bufferWriter.writeBytes(sizeBytes);
        }
    }
};


const universalTagNames=new Map([
    [0, "EOC"],
    [1, "BOOLEAN"],
    [2, "INTEGER"],
    [3, "BIT STRING"],
    [4, "OCTET STRING"],
    [5, "NULL"],
    [6, "OID"],
    [12, "UTF8String"],
    [16, "SEQUENCE"],
    [17, "SET"],
    [18, "NumericString"],
    [19, "PrintableString"],
    [20, "T61String"],
    [22, "IA5String"],
    [23, "UTCTime"],
]);

class X690Type {
    constructor(tagClass, tag, structured) {
        Object.assign(this, {tagClass, tag, structured});
    }
    toString() {
        let tagName=this.tag;
        if (this.tagClass === 0) tagName = tagName+' ('+universalTagNames.get(this.tag)+')';
        return `${['UNIVERSAL','APPLICATION','CONTEXT','PRIVATE'][this.tagClass]} ${tagName} ${this.structured}`;
    }
    static universal(code, structured = false) {
        return new X690Type(0, code, structured);
    }
    static context(code, structured = true) {
        if (code instanceof X690Type) return code;
        return new X690Type(2, code, structured);
    }
    equals(otherType) {
        return this.tagClass == otherType.tagClass
            && this.tag == otherType.tag
            && this.structured == otherType. structured;
    }
    makeContext(code) {
        return X690Type.context(code, this.structured);
    }
}

class UnexpectedTypeError extends Error {}


const x690typeEncoding=new class extends Encoding {
    /*constructor() {
        super();
        this.UNIVERSAL=0;
        this.APPLICATION=1;
        this.CONTEXT=2;
        this.PRIVATE=3;
    }*/
    read(bufferReader, context, value) {

        let identifier = bufferReader.readU8();
        let tag = identifier & 0x1f;
        if (tag == 31) {
            tag = variableWidthNumber.read(bufferReader, context);
        }
        return new X690Type(identifier >> 6, tag, (identifier & 0x20)>0);
    }
    write(bufferWriter, context, value) {
        let identifier = (value.tagClass<<6) + (value.structured ? 0x20 : 0) + value.tag>30 ? 31: value.tag;
        if (value.tag>30) {
            variableWidthNumber.write(bufferWriter, context, value.tag);
        }
        bufferWriter.writeU8(identifier);
    }
};

function x690(type, contentEncoding,defaultValue) {
    type.equals(type);
    let content=size(x690sizeEncoding,contentEncoding);
    return new class extends Encoding {
        constructor() {
            super();
            this.type=type;
            this.content=content;
            this.contentEncoding=contentEncoding;
        }
        read(bufferReader, context, value) {
            let nestedReader=bufferReader.subReader();
            let foundType=x690typeEncoding.read(nestedReader, context);
            //console.log(`read ${bufferReader.index} <${type}> ${type.equals(foundType)} ${defaultValue}`);
            if (!type.equals(foundType)) {
                if (defaultValue!==undefined) return defaultValue;
                throw new UnexpectedTypeError(`Type not expected, found: ${foundType}, expected: ${type}, at ${bufferReader.index}`);
            }
            let result=content.read(nestedReader, context, value);
            if (result && typeof result=='object') result.raw=bufferReader.readBytes(nestedReader.getReadSize());
            else bufferReader.eat(nestedReader.getReadSize());
            //console.log(`end ${type}`);
            return result;
        }
        write(bufferWriter, context, value) {
            x690typeEncoding.write(bufferWriter, context, value);
            content.write(bufferWriter, context, value);
        }
    }
}


function implicit(typeCode, base) {
    return x690(base.type.makeContext(typeCode), base.contentEncoding);
}


function optional(base, defaultValue) {
    return x690(base.type, base.contentEncoding, defaultValue);
}

function explicit(typeCode, base, defaultValue) {
    return x690(X690Type.context(typeCode), /*defaultValue !== undefined ? optional(base, defaultValue) : base*/base, defaultValue);
}


function choice(...options) {
    return new class extends Encoding {
        read(bufferReader, context, value) {
            let type = x690typeEncoding.read(bufferReader, context);
            let option = options.find(option=>option.type.equals(type));
            if (!option) throw new UnexpectedTypeError(`No option found`);
            return option.content.read(bufferReader, context, value);
        }
        write(bufferWriter, context, value) {
            let option = options.find(option=>option.encoding.can(value));
            if (!option) throw new UnexpectedTypeError(`No option found`);
            x690typeEncoding.write(bufferWriter,context,option.type);
            option.content.write(bufferWriter, context, value);
        }
    };
}



function stringEncoding(encodingName) {
    return new class STRING extends Encoding {
        can(value) {
            return typeof value == "string";
        }
        read(bufferReader, context, value) {
            return asBuffer(bufferReader.readBytes()).toString(encodingName);
        }
        write(bufferWriter, context, value) {
            bufferWriter.writeBytes(new Buffer(value, encodingName));
        }
    }
}



function structuredEncoding(itemSpecification) {
    let itemEncoding=interpretEncoding(itemSpecification);
    return new class extends Encoding {
        read(bufferReader, context, value) {
            let results =[];
            while (!bufferReader.eof()) {
                results.push(itemEncoding.read(bufferReader, context, value));
            }
            return results;
        }
        write(bufferWriter, context, value) {
            value.forEach(v=>itemEncoding.write(bufferWriter, context, v));
        }
    };
}

function numberEncoding(autoSwitch) {
    return new class NUMBER extends Encoding {
        read(bufferReader, context, value) {
            value=0;
            let bytes=bufferReader.readBytes();
            if (bytes.length>6 && autoSwitch) {
                return bytes;
            }
            for (let byte of bytes) {
                value=(value*256) + byte;
            }
            return value;
        }
        write(bufferWriter, context, value) {
            bufferWriter.writeBytes(typeof value == 'number' ? integerSplit(value) : value);
        }
    };
}


const oidNames=new Map([
    ['1.2.840.113549.1.1.1','RSA encryption'],
    ['1.2.840.113549.1.1.5','SHA-1 with RSA Encryption'],
    ['1.2.840.113549.1.1.11','SHA256 with RSA encryption'],
    ['2.5.4.3','CommonName'],
    ['2.5.4.6','Country'],
    ['2.5.4.8','State'],
    ['2.5.4.10','Organization'],
    ['2.5.4.11','OrganizationalUnit'],
    ['2.5.29.14','Subject Key Identifier'],
    ['2.5.29.15','Key Usage'],
    ['2.5.29.17','Subject Alternative Name'],
    ['2.5.29.19','Basic Constraints'],
    ['2.5.29.31','CRL Distribution Points'],
    ['2.5.29.32','Certificate Policies'],
    ['2.5.29.35','Authority Key Identifier'],
    ['2.5.29.37','Extended key usage'],
    ['2.16.840.1.113730.1.1','Netscape certificate type'],
]);









const boolean=x690(X690Type.universal(1),new class extends Encoding {
    read(bufferReader, context, value) {return bufferReader.readU8()>0;}
    write(bufferWriter, context, value) {bufferWriter.writeU8(value ? 255 : 0);}
});

const integer=x690(X690Type.universal(2),numberEncoding(false));
const integerBytes=x690(X690Type.universal(2),bytes());
const integerAuto=x690(X690Type.universal(2),numberEncoding(true));

const bitString=x690(X690Type.universal(3),new class extends Encoding {
    read(bufferReader, context) {return bufferReader.readBytes().slice(1);}
    write(bufferWriter, context, value) {bufferWriter.writeU8(0);bufferWriter.writeBytes(value);}
});


const octetString=x690(X690Type.universal(4),bytes());

const nullData=x690(X690Type.universal(5), new class NULL extends Encoding {
    read(bufferReader, context, value) {return null;}
    write(bufferWriter, context, value) {}
});


const oid=x690(X690Type.universal(6),new class extends Encoding {
    read(bufferReader, context, value) {
        let components=[];
        while (!bufferReader.eof()) {
            components.push(variableWidthNumber.read(bufferReader, context));
        }
        let [initial, ...following] = components;
        if (initial<80) return [(initial/40)>>0,initial % 40, ...following].join('.');
        return [2,initial-80, ...following].join('.');
    }
    write(bufferWriter, context, value) {
        let [initial, second, ...following]=value.split('.');
        let components=[initial*40+second, ...following];
        components.forEach(v=>variableWidthNumber.writeu8(bufferWriter,v));
    }
    stringify(value) {
        return value+(oidNames.has(value)?` (${oidNames.get(value)})`:'');
    }
});


const utf8string=x690(X690Type.universal(12),stringEncoding('utf8'));

function sequence(...componentSpecifications) {
    return x690(X690Type.universal(16,true),componentSpecifications);
}

function sequenceOf(componentSpecification) {
    return x690(X690Type.universal(16,true),structuredEncoding(componentSpecification));
}

function setOf(componentSpecification) {
    return x690(X690Type.universal(17,true),structuredEncoding(componentSpecification));
}

const printableString=x690(X690Type.universal(19),stringEncoding('ascii'));



const utcTime=x690(X690Type.universal(23),stringEncoding("ascii"));
const anyString=choice(utf8string, printableString);


let autoOptions = [
    boolean,
    integerAuto,
    bitString,
    octetString,
    oid,
    utf8string,
    printableString,
    nullData,
    utcTime,
];

const auto=new class extends Encoding {
    read(bufferReader, context) {
        let start = bufferReader.index;
        let type = x690typeEncoding.read(bufferReader, context);

        let content, contentEncoding;
        if (type.structured) {
            content=sequenceOf(auto).content;
        } else {
            let option = autoOptions.find(option=>option.type.equals(type)) || octetString;
            //if (!option) throw new UnexpectedTypeError(`Found: ${type} expected: ${autoOptions.map(o=>o.type).join(",")}`);
            content=option.content;
            contentEncoding=option.contentEncoding;
        }
        let value=content.read(bufferReader, context);
        let end = bufferReader.index;
        return {type, value, start, end, contentEncoding};
    }
    write(bufferWriter, context, value) {
        let option = options.find(option=>option.type.is(value.type));
        if (option) throw new UnexpectedTypeError(`No option found`);
        x690typeEncoding.write(bufferWriter,context,option.type);
        option.content.write(bufferWriter, context, value.value);
    }
};


function explain(data, node, indent='') {
    //let tagName=node.tagClass==x690type.UNIVERSAL ? universalTagNames.get(node.tag) : `[${['UNIVERSAL ','APPLICATION ','','PRIVATE '][node.tagClass]}${node.tag}]`;
    let encoding= node.contentEncoding;
    let nextIndent=indent+'  ';
    let result=indent + '{'+node.type+'}';
    let value = null;
    let children = null;
    let end = node.end;
    if (node.type.structured) {
        children = node.value.map(c=>explain(data,c,nextIndent)).join('\n');
        if (node.value.length) end=node.value[0].start;
    } else if (encoding && encoding.stringify) {
        value=encoding.stringify(node.value);
    } else if (node.value instanceof Uint8Array) {
        let content=node.value;
        if (node.tag==3) {
            content=node.value.subarray(1);
        }
        if (node.tag==3 || node.tag==4) {
            try {
                children=explain(content,read(content, null, auto),nextIndent);
                value='DECODED';
            } catch (e) {
                //value='UNDECODED: '+e.stack;
            }
        }

        if (!children) {
            children=nextIndent+toHex(content,'\n'+nextIndent);
        }
    } else {
        value = ''+node.value;
    }

    if (value) {
        result+=' = '+value;
    }


    result=result.padEnd(80)+(''+node.start).padStart(4)+' '+toHex(data.subarray(node.start, Math.min(node.start+12,end)));

    if (children) {
        result+='\n'+children;
    }

    return result;
}

const USAGE=`
x690-io pem file.pem
`;

function main(inputFormat, inputFile, outputFormat) {
    if (inputFormat=='hex') {
        let data=Buffer.from(fs.readFileSync(inputFile).toString("ascii"),'hex');
        console.log(data.toString("hex"));
        console.log(explain(data, read(data, null, auto)));
    }
    else if (inputFormat=='pem') {
        let data=new Buffer(fs.readFileSync(inputFile).toString('ascii').replace(/-----.*-----/g,''),'base64');
        console.log(explain(data, read(data, null, auto)));
    } else {
        console.log(USAGE);
    }
}

if (require.main === module) {
    main(...process.argv.slice(2));
}


module.exports={main, sequence, sequenceOf, setOf, optional, boolean, explicit, integer, bitString, octetString, anyString, integerBytes, integerAuto, integer, oid, auto};
