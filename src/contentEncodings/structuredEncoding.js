// const { Encoding } = require('structured-io');

// function structuredEncoding(itemEncoding) {
//     Encoding.check(itemEncoding);
//     return new class extends Encoding {
//         read(bufferReader, value) {
//             let results = [];
//             while (!bufferReader.eof()) {
//                 results.push(itemEncoding.read(bufferReader, null));
//             }
//             return results;
//         }
//         write(bufferWriter, value) {
//             value.forEach(v => itemEncoding.write(bufferWriter, v));
//         }
//     };
// }
// module.exports = structuredEncoding;
