import { Annotated } from 'structured-io';
import X690Type from '../X690Type.js';
import sized from '../sized.js';
import UnexpectedTypeError from '../UnexpectedTypeError.js';


export default (type, contentEncoding, defaultValue) =>
    new (class extends Annotated {
        constructor() {
            super(type.toString());
        }

        type = type;
        contentEncoding = contentEncoding;

        read(bufferReader, value) {
            let reader = bufferReader.here();
            let foundType = X690Type.encoding.read(reader, new X690Type());
            if (!foundType.equals(type)) {
                if (defaultValue !== undefined) return defaultValue;
                throw new UnexpectedTypeError(`Type not expected, found: ${foundType}, expected: ${type}`);
            }
            let result = sized(contentEncoding).read(reader, value);
            bufferReader.eat(reader.getReadSize());
            return result;
        }

        write(bufferWriter, value) {
            X690Type.encoding.write(bufferWriter, type);
            sized(contentEncoding).write(bufferWriter, value);
        }

    });
