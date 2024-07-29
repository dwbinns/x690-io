import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

class BooleanEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(1));
    }
    decodeContent(content) {
        return content[0] > 0;
    }
    encodeContent(value) {
        return new Uint8Array([value ? 255 : 0]);
    }
    canEncode(value) {
        return typeof value == "boolean";
    }
}



export const boolean = () => new BooleanEncoding();
