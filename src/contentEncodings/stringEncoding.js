const { asBuffer } = require('buffer-io');
const { AnnotatedValue } = require('structured-io');

class STRING extends AnnotatedValue {
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
