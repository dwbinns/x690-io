import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

const concatBytes = (...arrays) => {
    let result = new Uint8Array(arrays.reduce((length, array) => length + array.length, 0));
    let index = 0;
    for (let array of arrays) {
        result.set(array, index);
        index += array.length;
    }
    return result;
};

class BitStringEncoding extends X690TypedEncoding {
    constructor(type) {
        super(type);
    }
    decodeContent(content) {
        return content.slice(1);
    }
    encodeContent(value) {
        return concatBytes([0], value);
    }
    canEncode(value) {
        return value instanceof Uint8Array;
    }
}



export const bitString = () => new BitStringEncoding(X690Type.universal(3));
