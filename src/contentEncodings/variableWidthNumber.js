import { Encoding } from 'structured-io';

function integerSplit7(integer) {
    let bytes = [];
    do {
        bytes.unshift((integer & 0x7f) | (bytes.length > 0 ? 0x80 : 0));
        integer >>= 7;
    } while (integer > 0);
    return bytes;
}



export default new (class extends Encoding {
    read(bufferReader, value) {
        value = 0;
        while (true) {
            value <<= 7;
            let byte = bufferReader.readU8();
            value |= byte & 0x7f;
            if (!(byte & 0x80)) break;
        }
        return value;
    }
    write(bufferWriter, value) {
        integerSplit7(value).forEach(v => bufferWriter.writeU8(v));
    }
});
