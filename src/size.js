import integerSplit8 from './integerSplit8.js';



export function readSize(bufferReader) {
    let length = bufferReader.readU8();
    if (length == 0x80) {
        throw new Error("Indefinite length not legal in x690 DER");
    }
    let size = 0;
    if (length > 0x80) {
        for (let i = 0; i < (length & 0x7f); i++) {
            let byte = bufferReader.readU8();
            size = (size << 8) + byte;
        }
    } else {
        size = length;
    }
    //console.log("read size", size);
    return size;
}

export function writeSize(bufferWriter, value) {
    //console.log("write size", value);
    if (value < 0x80) {
        bufferWriter.writeU8(value);
    } else {
        let sizeBytes = integerSplit8(value);
        bufferWriter.writeU8(sizeBytes.length | 0x80);
        sizeBytes.forEach(b => bufferWriter.writeU8(b));
    }
}

// export const x = contentEncoding =>
//     new (class extends Encoding {
//         read(bufferReader, value) {
//             let nestedReader = bufferReader.here();

//             let size = x690sizeEncoding.read(nestedReader);
//             let totalSize = size + nestedReader.getReadSize();
//             nestedReader.setSize(totalSize);
//             let result = contentEncoding.read(nestedReader, value);

//             if (nestedReader.getReadSize() != totalSize) throw new Error(`Read underflow ${nestedReader.getReadSize()} != ${totalSize}`);

//             bufferReader.eat(totalSize);

//             return result;
//         }
//         write(bufferWriter, value) {
//             let content = write(value, contentEncoding);
//             x690sizeEncoding.write(bufferWriter, content.length);
//             bufferWriter.writeBytes(content);
//         }
//     });


