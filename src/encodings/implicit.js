import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";



class Implicit extends X690TypedEncoding {
    constructor(code, content) {
        if (!(content instanceof X690TypedEncoding)) throw new Error("Invalid implicit content");
        super(X690Type.context(code, content.type.constructed));
        this.content = content;

    }
    decodeContent(content, target) {
        return this.content.decodeContent(content, target);
    }
    encodeContent(value) {
        return this.content.encodeContent(value);
    }

    canEncode(value) {
        return this.content.canEncode(value);
    }
}

export const implicit = (code, content) => new Implicit(code, content);



