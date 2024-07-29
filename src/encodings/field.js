import { wrap, X690WrappedEncoding } from "./encodings.js";

class Field extends X690WrappedEncoding {
    constructor(name, encoding) {
        super(encoding, `.${name}`);
        this.name = name;
    }
    
    decode(dataValue, target) {
        target[this.name] = super.decode(dataValue, target[this.name]);
    }
    encode(target) {
        return super.encode(target[this.name]);
    }
    canEncode(value) {
        return this.encoding.canEncode(value[this.name]);
    }
}

export const field = (name, encoding) => wrap(Field, name, name, encoding);


