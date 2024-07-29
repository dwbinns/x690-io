import { bigintToBytes, bytesToBigint } from "../bigIntBytes.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";



class BigIntEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(2));
    }
    decodeContent(content) {
        return bytesToBigint(content);
    }
    encodeContent(value) {
        return bigintToBytes(value);
        
    }
    canEncode(value) {
        return typeof value == "bigint";
    }
}

export const bigInt = () => new BigIntEncoding();



