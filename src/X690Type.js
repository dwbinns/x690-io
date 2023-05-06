import { Encoding } from 'structured-io';


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


class X690typeEncoding extends Encoding {

    // https://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf#page=12
    read(bufferReader) {

        let identifier = bufferReader.readU8();
        let tag = identifier & 0x1f;
        if (tag == 31) {
            tag = variableWidthNumber.read(bufferReader);
        }
        let type = new X690Type(identifier >> 6, tag, (identifier & 0x20) > 0);
        return type;
    }
    write(bufferWriter, value) {
        let identifier = (value.tagClass << 6) + (value.constructed ? 0x20 : 0) + (value.tag > 30 ? 31 : value.tag);

        bufferWriter.writeU8(identifier);
        if (value.tag > 30) {
            variableWidthNumber.write(bufferWriter, value.tag);
        }

    }
}


class X690Type {
    constructor(tagClass, tag, constructed) {
        Object.assign(this, { tagClass, tag, constructed });
    }
    toString() {
        let tagName = this.tag;
        if (this.tagClass === 0) {
            tagName = tagName + ' (' + universalTagNames.get(this.tag) + ')';
        }
        return `${tagClasses[this.tagClass]} ${tagName} ${this.constructed ? "constructed" : "primitive"}`;
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

    static encoding = new X690typeEncoding();
}

export default X690Type;