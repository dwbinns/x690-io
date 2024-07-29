import { DataValue } from "../DataValue.js";
import X690Type from "../X690Type.js";
import { X690Encoding, X690TypedEncoding } from "./encodings.js";



class Explicit extends X690TypedEncoding {
    constructor(code, content) {
        super(X690Type.context(code));
        this.content = X690Encoding.verify(content);
    }
    decodeContent(content, target) {
        if (content.length != 1) throw new Error("Explicit requires one element");
        let item = content[0];
        return this.content.decode(item, target);
    }

    encodeContent(value) {
        return [this.content.encode(value)];
    }
    
    canEncode(value) {
        return this.content.canEncode(value);
    }
}

export const explicit = (code, content) => new Explicit(code, content);



