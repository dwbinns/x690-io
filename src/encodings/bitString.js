import { concatBytes } from "buffer-io";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";
import * as hex from "@dwbinns/base/hex";


class BitStringEncoding extends X690TypedEncoding {
    constructor(type) {
        super(type);
    }
    decodeContent(content) {
        return content.slice(1);
    }
    encodeContent(value) {
        if (typeof value == "string") value = hex.decode(value);
        return concatBytes([0], value);
    }
    canEncode(value) {
        return value instanceof Uint8Array;
    }
}



export const bitString = () => new BitStringEncoding(X690Type.universal(3));
