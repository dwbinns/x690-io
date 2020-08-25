const {Encoding} = require("structured-io");

module.exports = new class NULL extends Encoding {
    read(bufferReader, value) { return null; }
    write(bufferWriter, value) { }
};