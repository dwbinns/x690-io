import { bigintToBytes, bytesToBigint } from "../bigIntBytes.js";
import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

class NumberEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(2));
    }
    decodeContent(content) {
        return Number(bytesToBigint(content));
    }
    encodeContent(value) {
        return bigintToBytes(BigInt(value));
    }
    canEncode(value) {
        return typeof value == "number";
    }
}

export const integer = () => new NumberEncoding();



