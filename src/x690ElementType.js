const {bytes, instance, sequence, call, array, dynamic, field} = require("structured-io");
const sized = require("./sized");
const X690Type = require("./X690Type");

// module.exports = contentEncodingFactory => class X690Element {
//     constructor(type, value) {
//         this.type = type;
//         this.value = value;
//     }

//     static encoding = sequence(
//         field("type", instance(X690Type)),
//         sized(
//             dynamic(({type}) =>
//                 field("value",
//                     contentEncodingFactory(type)
//                 )
//             )
//         ),
//     );
// };