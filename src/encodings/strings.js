import X690Type from "../X690Type.js";
import { choice } from "./choice.js";
import { X690TypedEncoding } from "./encodings.js";

const textDecoder = new TextDecoder("utf8");
const textEncoder = new TextEncoder("utf8");

class StringEncoding extends X690TypedEncoding {
    constructor(type, encodingName) {
        super(type);
        this.encodingName = encodingName;
    }
    decodeContent(content) {
        return textDecoder.decode(content);
    }
    encodeContent(value) {
        return textEncoder.encode(value);
    }
    canEncode(value) {
        return typeof value == "string";
    }
}



export const utf8string = () => new StringEncoding(X690Type.universal(12), 'utf8');
export const printableString = () => new StringEncoding(X690Type.universal(19), 'ascii');
export const ia5String = () => new StringEncoding(X690Type.universal(20), 'ascii');
export const t61String = () => new StringEncoding(X690Type.universal(22), 'ascii');

export const anyString = () => choice(utf8string(), printableString(), ia5String(), t61String());