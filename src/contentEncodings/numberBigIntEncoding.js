import { Encoding } from 'structured-io';

function bigintSplit8(integer) {
    let bytes = [];
    do {
        bytes.unshift(Number(integer & 0xffn));
        integer >>= 8n;
    } while (integer > 0n);
    return bytes;
}


export default new (class NUMBER extends Encoding {
    read(bufferReader, value) {
        return [...bufferReader.readBytes()]
            .reduce(
                (result, byte) => result * 256n + BigInt(byte),
                0n
            );
    }
    write(bufferWriter, value) {
        bigintSplit8(value).forEach(b => bufferWriter.writeU8(b));
    }
});
