const {Annotated, Encoding, annotate} = require("structured-io");

const OID = require("../OID");
const variableWidthNumber = require("./variableWidthNumber");

class OIDEncoding extends Annotated {
    explain(value) {
        return value;
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
};

module.exports = () => new OIDEncoding();


// const oidNameEncoding = new class extends Encoding {
//     read(bufferReader, value) {
//         return oids.toName(oidEncoding.read(bufferReader, value));
//     }
//     write(bufferWriter, value) {
//         return oidEncoding.write(bufferWriter, oids.toOID(value));
//     }
// };

