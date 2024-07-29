import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

const textDecoder = new TextDecoder("utf8");
const textEncoder = new TextEncoder("utf8");


class UTCTimeEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(23));
    }
    decodeContent(content) {
        let text = textDecoder.decode(content);
        let match = text.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z$/);
        if (!match) throw new Error("Date not understood: " + text);
        let [, year, month, date, hour, minute, second] = match;
        let numericYear = Number(year);
        let fullYear = numericYear >= 50 ? 1900 + numericYear : 2000 + numericYear;
        let isoString = `${fullYear}-${month}-${date}T${hour}:${minute}:${second}Z`;
        return new Date(isoString);
    }
    encodeContent(value) {
        let year = value.getUTCFullYear();
        if (year >= 2050 || year < 1950) throw new Error("UTCtime year not in range 1950-2049");
        let month = value.getUTCMonth() + 1;
        let date = value.getUTCDate();
        let hour = value.getUTCHours();
        let minute = value.getUTCMinutes();
        let second = value.getUTCSeconds();
        let dateString = [year % 100, month, date, hour, minute, second]
            .map(part => part.toString().padStart(2, '0'))
            .join("")
            + "Z";
        return textEncoder.encode(dateString);
    }
    canEncode(value) {
        return value instanceof Date;
    }
}



export const utcTime = () => new UTCTimeEncoding();
