import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";


class SequenceOf extends X690TypedEncoding {
    constructor(code, itemEncoding) {
        super(X690Type.universal(code, true));
        this.itemEncoding = itemEncoding;
    }
    decodeContent(content) {
        return content.map(item => this.itemEncoding.decode(item));
    }
    
    encodeContent(value) {
        return value.map(item => this.itemEncoding.encode(item));
    }

    canEncode(value) {
        return value instanceof Array;
    }
}

export const sequenceOf = (itemEncoding) => new SequenceOf(16, itemEncoding);
export const setOf = (itemEncoding) => new SequenceOf(17, itemEncoding);



