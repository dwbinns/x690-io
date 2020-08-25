const { asBuffer } = require('buffer-io');
const { Encoding, annotate } = require('structured-io');

class STRING extends Encoding {
    can(value) {
        return typeof value == "string";
    }
    read(bufferReader, value) {
        return asBuffer(bufferReader.readBytes()).toString(this.encodingName);
    }
    write(bufferWriter, value) {
        bufferWriter.writeBytes(Buffer.from(value, this.encodingName));
    }
}

module.exports = encodingName => new STRING(encodingName);
