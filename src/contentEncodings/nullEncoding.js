import { Encoding } from 'structured-io';

export default new class NULL extends Encoding {
    can(value) {
        return value == null;
    }
    read(bufferReader, value) { return null; }
    write(bufferWriter, value) { }
};