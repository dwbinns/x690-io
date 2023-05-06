import { asBuffer } from 'buffer-io';
import { Annotated } from 'structured-io';
import integerSplit8 from '../integerSplit8.js';

const dd = number => number.toString().padStart(2, '0');

class DateEncoding extends Annotated {
    explain(value) {
        return value.toISOString();
    }
    read(bufferReader) {
        let text = asBuffer(bufferReader.readBytes()).toString("utf8");
        let match = text.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z$/);
        if (!match) throw new Error("Date not understood: " + text);
        let [, year, month, date, hour, minute, second] = match;
        let numericYear = Number(year);
        let fullYear = numericYear >= 50 ? 1900 + numericYear : 2000 + numericYear;
        let isoString = `${fullYear}-${month}-${date}T${hour}:${minute}:${second}Z`;
        return new Date(isoString);
    }
    write(bufferWriter, value) {
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
        bufferWriter.writeBytes(Buffer.from(dateString));
    }
}

export default () => new DateEncoding();