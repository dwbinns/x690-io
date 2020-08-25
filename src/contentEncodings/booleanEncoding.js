const {Annotated} = require("structured-io");

class BooleanEncoding extends Annotated {
    read(bufferReader, value) { return bufferReader.readU8() > 0; }
    write(bufferWriter, value) { bufferWriter.writeU8(value ? 255 : 0); }
};

module.exports = () => new BooleanEncoding();