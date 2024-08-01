import { BufferReader, BufferWriter } from "buffer-io";
import { OID } from "../OID.js";
import * as variableWidthNumber from "../variableWidthNumber.js";
import X690Type from "../X690Type.js";
import { X690TypedEncoding } from "./encodings.js";

class OIDEncoding extends X690TypedEncoding {
    constructor() {
        super(X690Type.universal(6), OID);
    }

    decodeContent(content) {
        let bufferReader = new BufferReader(content);

        let components = [];
        while (!bufferReader.eof()) {
            components.push(variableWidthNumber.read(bufferReader));
        }

        let [initial, ...following] = components;

        let decodedComponents = initial < 80
            ? [(initial / 40) >> 0, initial % 40, ...following]
            : [2, initial - 80, ...following];

        return new OID(decodedComponents.join('.'));
    }
    encodeContent(value) {
        let [initial, second, ...following] = value.id.split('.').map(Number);
        let components = [initial * 40 + second, ...following];

        let bufferWriter = new BufferWriter();

        components.forEach(v => variableWidthNumber.write(bufferWriter, v));

        return bufferWriter.getBuffer();
    }

}

export const oid = () => new OIDEncoding();



