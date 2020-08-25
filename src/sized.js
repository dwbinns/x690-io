const { write, annotate, Encoding, AnnotatedValue } = require("structured-io");
const integerSplit8 = require("./integerSplit8");


const x690sizeEncoding = new class X690Size extends AnnotatedValue {
    read(bufferReader, value) {
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
        return size;
    }
    write(bufferWriter, value) {
        if (value < 0x80) {
            bufferWriter.writeU8(value);
        } else {
            let sizeBytes = integerSplit8(value);
            bufferWriter.writeU8(sizeBytes.length | 0x80);
            sizeBytes.forEach(b => bufferWriter.writeU8(b));
        }
    }
};


module.exports = contentEncoding =>
    new class extends Encoding {
        read(bufferReader, value) {
            let nestedReader = bufferReader.here();

            let size = x690sizeEncoding.read(nestedReader);
            let totalSize = size + nestedReader.getReadSize();
            nestedReader.setSize(totalSize);
            let result = contentEncoding.read(nestedReader, value);

            if (nestedReader.getReadSize() != totalSize) throw new Error("Read underflow");

            bufferReader.eat(totalSize);

            return result;
        }
        write(bufferWriter, value) {
            let content = write(value, contentEncoding);
            x690sizeEncoding.write(bufferWriter, content.length);
            bufferWriter.writeBytes(content);
        }
    };


