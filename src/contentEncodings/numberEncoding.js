const { Encoding } = require('structured-io');
const integerSplit8 = require('../integerSplit8');



class NUMBER extends Encoding {
    read(bufferReader, value) {
        return [...bufferReader.readBytes()]
            .reduce(
                (result, byte) => result * 256 + byte,
                0
            );
    }
    write(bufferWriter, value) {
        integerSplit8(value).forEach(b => bufferWriter.writeU8(b));
    }
};

module.exports = () => new NUMBER();