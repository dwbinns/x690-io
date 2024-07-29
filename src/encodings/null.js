import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

class NullEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(5));
    }
    decodeContent(content) {
        if (content.length != 0) throw new Error("Null data");
        return null;
    }
    encodeContent(value) {
        return new Uint8Array();
    }
    canEncode(value) {
        return value == null;
    }
}

export const nullData = () => new NullEncoding();



