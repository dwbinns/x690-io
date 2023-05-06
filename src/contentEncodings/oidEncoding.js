import { AnnotatedValue } from 'structured-io';
import OID from '../OID.js';
import variableWidthNumber from './variableWidthNumber.js';

class OIDEncoding extends AnnotatedValue {
    can(value) {
        return value instanceof OID;
    }
    read(bufferReader) {
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

    write(bufferWriter, value) {
        let [initial, second, ...following] = value.id.split('.').map(Number);
        let components = [initial * 40 + second, ...following];

        components.forEach(v => variableWidthNumber.write(bufferWriter, v));
    }
}

export default () => new OIDEncoding();


// const oidNameEncoding = new class extends Encoding {
//     read(bufferReader, value) {
//         return oids.toName(oidEncoding.read(bufferReader, value));
//     }
//     write(bufferWriter, value) {
//         return oidEncoding.write(bufferWriter, oids.toOID(value));
//     }
// };

