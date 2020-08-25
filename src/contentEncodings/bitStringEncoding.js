const {Encoding} = require("structured-io");

module.exports = new class extends Encoding {
    // assumes no partial bytes
    read(bufferReader) {
        return bufferReader.readBytes().slice(1);
    }
    write(bufferWriter, value) {
        bufferWriter.writeU8(0);
        bufferWriter.writeBytes(value);
    }
};