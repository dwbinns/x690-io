import { Encoding } from 'structured-io';
import integerSplit8 from '../integerSplit8.js';



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
}

export default () => new NUMBER();