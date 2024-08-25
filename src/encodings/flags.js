import { signedBigintToBytes, bytesToSignedBigint } from "../bigIntBytes.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

const byte = index => 1 + (index >> 3);
const bit = index => (128 >> (index & 7));

class FlagsEncoding extends X690TypedEncoding {
    constructor(type, names) {
        super(type);
        this.names = names;
    }
    decodeContent(content) {
        return Object.fromEntries(this.names.map((name, index) => [name, !!(content[byte(index)] & bit(index))]));
    }
    encodeContent(value) {
        let bytes = new Uint8Array(byte(this.names.length - 1) + 1);
        this.names.forEach((name, index) => bytes[byte(index)] |= value[name] ? bit(index) : 0);
        return bytes;
    }
    canEncode(value) {
        return value instanceof Uint8Array;
    }
}



export const flags = (names) => new FlagsEncoding(X690Type.universal(3), names);
