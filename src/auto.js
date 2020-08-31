// const {annotate, Encoding} = require("structured-io");

// const {boolean, integer, bitString, octetString, oid, utf8string, ia5String, t61String, printableString, nullData, utcTime, sequenceOf} = require("./asn1types");
// const UnexpectedTypeError = require("./UnexpectedTypeError");
// const X690Type = require("./X690Type");

// let autoOptions = [
//     boolean,
//     integer,
//     bitString,
//     octetString,
//     oid,
//     utf8string,
//     ia5String,
//     t61String,
//     printableString,
//     nullData,
//     utcTime,
// ];



// const auto = annotate(v => "x690", new class extends Encoding {
//     read(bufferReader) {
//         let type = X690Type.encoding.read(bufferReader);

//         let typeEncoding = type.structured
//             ? sequenceOf(auto)
//             : autoOptions.find(option => option.type.equals(type)) || octetString

//         let value = typeEncoding.content.read(bufferReader);

//         return new Auto(type, value);
//     }
//     write(bufferWriter, value) {
//         let option = autoOptions.find(option => option.type.equals(value.type)) || octetString;
//         X690Type.encoding.write(bufferWriter, value.type);
//         option.content.write(bufferWriter, value.value);
//     }
// });

// class Auto {
//     constructor(type, value) {
//         this.type = type;
//         this.value = value;
//     }

//     static encoding = auto;
// }

// module.exports = auto;