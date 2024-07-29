import { X690WrappedEncoding } from "./encodings.js";



class Optional extends X690WrappedEncoding {
    constructor(encoding, defaultValue) {
        super(encoding);
        this.defaulValue = defaultValue;
    }
    decode(dataValue, target) {
        return dataValue ? this.encoding.decode(dataValue, target) : this.defaulValue;
    }
    encode(target) {
        if (target !== this.defaulValue && this.encoding.canEncode(target)) {
            return this.encoding.encode(target);
        }
    }

    isOptional() {
        return true;
    }
}

export const optional = (content, defaulValue) => new Optional(content, defaulValue);



