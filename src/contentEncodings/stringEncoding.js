import { asBuffer } from 'buffer-io';
import { AnnotatedValue } from 'structured-io';

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

export default encodingName => new STRING(encodingName);
