import { readSize, writeSize } from './size.js';
import X690Type from './X690Type.js';

import { blue, green } from "@dwbinns/terminal/colour";
import { BufferReader, BufferWriter } from 'buffer-io';
import { bytesFormat } from './byteFormat.js';
import { bigInt } from './encodings/bigInt.js';
import { boolean } from './encodings/boolean.js';
import { choice } from './encodings/choice.js';
import { nullData } from './encodings/null.js';
import { oid } from './encodings/oid.js';
import { ia5String, printableString, t61String, utf8string } from './encodings/strings.js';
import { utcTime } from './encodings/utcTime.js';
import * as hex from "@dwbinns/base/hex";
import { bitString } from './encodings/bitString.js';


const any = choice(bitString(), boolean(), bigInt(), oid(), utf8string(), printableString(), ia5String(), t61String(), utcTime(), nullData());

const assert = (required, message) => {
    if (!required) throw new Error(`Requirement failed: ${message}`);
}

export class DataValue {
    constructor(type, content) {
        this.type = type;
        if (type.constructed) assert(content instanceof Array && content.every(c => c instanceof DataValue));
        else assert(content instanceof Uint8Array, "content is primitive uint8array or constructed array");
        this.content = content;
    }

    toJSON() {
        let type = this.type.serial();
        if (this.type.constructed) return { type, content: this.content };
        if (any.canDecode(this)) {
            let value = any.decode(this);
            if (value instanceof Uint8Array) {
                value = hex.encode(value);
            }
            return { type, decode: value.toJSON ? value.toJSON() : `${value}` };
        }
        return { type, bytes: hex.encode(this.content) };
    }

    static fromJSON(object) {
        let type = X690Type.fromSerial(object.type);
        if (object.content) return new DataValue(type, object.content.map(item => DataValue.fromJSON(item)));

        if (object.decode !== undefined) {
            return any.fromSerial(type, object.decode);
        }
        return new DataValue(type, hex.decode(object.bytes));
    }

    decode() {
        if (any.canDecode(this)) return any.decode(this);
    }

    static read(reader) {
        if (reader instanceof ArrayBuffer) reader = new BufferReader(new Uint8Array(reader));
        if (reader instanceof Uint8Array) reader = new BufferReader(reader);
        let start = reader.index;
        let type = X690Type.read(reader);
        let size = readSize(reader);

        let bytes = reader.readBytes(size);
        let end = reader.index;
        let result;

        if (type.constructed) {
            let childReader = new BufferReader(bytes);
            let children = [];
            while (!childReader.eof()) {
                children.push(DataValue.read(childReader));
            }
            result = new DataValue(type, children);
        } else {
            result = new DataValue(type, bytes);
        }
        result.annotation = { start, end, bytes: reader.uint8array.subarray(start, end) };
        return result;
    }

    getBytes() {
        const writer = new BufferWriter();
        this.write(writer);
        return writer.getUint8Array();
    }

    write(writer) {
        let contentWriter = new BufferWriter();
        if (this.type.constructed) {
            for (let child of this.content) {
                //console.log(child);
                child.write(contentWriter);
            }
        } else {
            contentWriter.writeBytes(this.content);
        }
        let contents = contentWriter.getUint8Array();
        this.type.write(writer);
        writeSize(writer, contents.length);
        writer.writeBytes(contents);
    }

    getDescription() {
        let decoded = this.decode();
        if (decoded === undefined) {
            if (this.content instanceof Array) {
                return blue(this.type.toString());
            }
            return blue(this.type.toString()) + "\n" + bytesFormat(this.content);
        }
        if (decoded instanceof Uint8Array) {
            return blue(this.type.toString()) + "\n" + bytesFormat(decoded);
        }
        if (decoded === null) {
            return blue(this.type.toString()) + " <null>";
        }
        return blue(this.type.toString()) + " " + decoded;
    }

    getChildren() {
        return this.type.constructed ? this.content : [];
    }
}

