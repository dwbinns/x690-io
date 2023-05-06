import { write, annotate, Encoding } from 'structured-io';
import UnexpectedTypeError from './UnexpectedTypeError.js';
import X690Type from './X690Type.js';



// const x690sizeEncoding = annotate(v => `size: ${v}`, new class extends Encoding {
//     read(bufferReader, value) {
//         let length = bufferReader.readU8();
//         if (length == 0x80) {
//             throw new Error("Indefinite length not legal in x690 DER");
//         }
//         let size = 0;
//         if (length > 0x80) {
//             for (let i = 0; i < (length & 0x7f); i++) {
//                 let byte = bufferReader.readU8();
//                 size = (size << 8) + byte;
//             }
//         } else {
//             size = length;
//         }
//         return size;
//     }
//     write(bufferWriter, value) {
//         if (value < 0x80) {
//             bufferWriter.writeU8(value);
//         } else {
//             let sizeBytes = integerSplit8(value);
//             bufferWriter.writeU8(sizeBytes.length | 0x80);
//             sizeBytes.forEach(b => bufferWriter.writeU8(b));
//         }
//     }
// });






function x690(type, contentEncoding, defaultValue) {
    Encoding.check(contentEncoding);
    let content = sized(contentEncoding);
    return new (class extends Encoding {

        constructor() {
            super();
            this.content = content;
            this.type = type;
            this.contentEncoding = contentEncoding;
        }
        can(content) {
            return this.contentEncoding.can(content);
        }

        read(bufferReader, value) {
            if (bufferReader.getRemainingSize() == 0) {
                if (defaultValue !== undefined) return defaultValue;
                throw new UnexpectedTypeError(`EOF`);
            }
            let nestedReader = bufferReader.here();
            let foundType = X690Type.encoding.read(nestedReader);

            if (!type.equals(foundType)) {
                if (defaultValue !== undefined) return defaultValue;
                throw new UnexpectedTypeError(`Type not expected, found: ${foundType}, expected: ${type}, at ${bufferReader.index}`);
            }
            bufferReader.eat(nestedReader.getReadSize());

            return this.content.read(bufferReader, value);
        }
        write(bufferWriter, value) {
            X690Type.encoding.write(bufferWriter, this.type);

            return this.content.write(bufferWriter, value);
        }
    });
}

export default x690;
