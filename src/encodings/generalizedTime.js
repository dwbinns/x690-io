import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

const textDecoder = new TextDecoder("utf8");
const textEncoder = new TextEncoder("utf8");


class GeneralizedTimeEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(24));
    }
    decodeContent(content) {
        let text = textDecoder.decode(content);
        let match = text.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2}(.\d+)?)Z$/);
        if (!match) throw new Error("Date not understood: " + text);
        let [, year, month, date, hour, minute, second] = match;
        let isoString = `${year}-${month}-${date}T${hour}:${minute}:${second}Z`;
        return new Date(isoString);
    }
    encodeContent(value) {
        let year = value.getUTCFullYear().toString().padStart(4, '0');
        let month = (value.getUTCMonth() + 1).toString().padStart(2, '0');
        let date = value.getUTCDate().toString().padStart(2, '0');
        let hour = value.getUTCHours().toString().padStart(2, '0');
        let minute = value.getUTCMinutes().toString().padStart(2, '0');
        let second = value.getUTCSeconds().toString().padStart(2, '0');
        let milliseconds = `.${value.getMilliSeconds().toString().replace(/0+$/, '')}`;
        if (milliseconds == ".") milliseconds = "";
        let dateString = `${year}${month}${date}${hour}${minute}${second}${milliseconds}`;
        return textEncoder.encode(dateString);
    }
    canEncode(value) {
        return value instanceof Date;
    }
}



export const generalizedTime = () => new GeneralizedTimeEncoding();
