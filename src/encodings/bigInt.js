import { signedBigintToBytes, bytesToSignedBigint } from "../bigIntBytes.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";



class BigIntEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(2));
    }
    decodeContent(content) {
        return bytesToSignedBigint(content);
    }
    encodeContent(value) {
        if (typeof value == "string") value = BigInt(value);
        return signedBigintToBytes(value);
        
    }
    canEncode(value) {
        return typeof value == "bigint";
    }
}

export const bigInt = () => new BigIntEncoding();



