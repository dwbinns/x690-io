import * as variableWidthNumber from "./variableWidthNumber.js";

const tagClasses = ['UNIVERSAL', 'APPLICATION', 'CONTEXT', 'PRIVATE'];

const universalTagNames = new Map([
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
    constructor(tagClass, tag, constructed) {
        this.tagClass = tagClass;
        this.tag = tag;
        this.constructed = constructed;
    }
    toString() {
        let tagName = this.tag;
        if (this.tagClass === 0) {
            tagName = tagName + ' (' + universalTagNames.get(this.tag) + ')';
        }
        return `${tagClasses[this.tagClass]} ${tagName} ${this.constructed ? "constructed" : "primitive"}`;
    }
    serial() {
        return `${tagClasses[this.tagClass][0]}${this.tag}${this.constructed ? "C" : "P"}`;
    }
    static fromSerial(string) {
        let tagClass = 'UACP'.indexOf(string[0]);
        let constructed = 'C' == string.at(-1);
        let tag = Number(string.slice(1, -1));
        return new X690Type(tagClass, tag, constructed);
    }
    static universal(code, constructed = false) {
        return new X690Type(0, code, constructed);
    }
    static context(code, constructed = true) {
        if (code instanceof X690Type) {
            return code;
        }
        return new X690Type(2, code, constructed);
    }
    equals(otherType) {
        return this.tagClass == otherType.tagClass
            && this.tag == otherType.tag
            && this.constructed == otherType.constructed;
    }
    makeContext(code) {
        return X690Type.context(code, this.constructed);
    }

    static read(bufferReader) {


        let identifier = bufferReader.readU8();
        let tag = identifier & 0x1f;
        if (tag == 31) {
            tag = variableWidthNumber.read(bufferReader);
        }
        // console.log("Read type", tag.toString(16));
        let type = new X690Type(identifier >> 6, tag, (identifier & 0x20) > 0);
        return type;


    }

    write(bufferWriter) {
        let identifier = (this.tagClass << 6) + (this.constructed ? 0x20 : 0) + (this.tag > 30 ? 31 : this.tag);
        //console.log("Write type", identifier.toString(16));
        bufferWriter.writeU8(identifier);
        if (this.tag > 30) {
            variableWidthNumber.write(bufferWriter, this.tag);
        }
    }
}

export default X690Type;