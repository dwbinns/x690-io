import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

class BytesEncoding extends X690TypedEncoding {
    constructor(type) {
        super(type);
    }
    decodeContent(content) {
        return content;
    }
    encodeContent(value) {
        return value;
    }
    canEncode(value) {
        return value instanceof Uint8Array;
    }
}



export const octetString = () => new BytesEncoding(X690Type.universal(4));
