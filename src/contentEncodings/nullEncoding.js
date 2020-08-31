const {Encoding} = require("structured-io");

module.exports = new class NULL extends Encoding {
    can(value) {
        return value == null;
    }
    read(bufferReader, value) { return null; }
    write(bufferWriter, value) { }
};