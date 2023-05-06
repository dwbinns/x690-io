import { Encoding } from 'structured-io';
import X690Type from '../X690Type.js';
import UnexpectedTypeError from '../UnexpectedTypeError.js';


class Choice extends Encoding {
    constructor(options) {
        super();
        this.options = options;
        options.forEach(Encoding.check);
        options.forEach(({contentEncoding}) => Encoding.check(contentEncoding));
    }
    read(bufferReader, value) {
        for (let option of this.options) {
            try {
                return bufferReader.nest(reader => option.read(reader, value));
            } catch (e) {
                if (!(e instanceof UnexpectedTypeError))
                    throw e;
            }
        }
        let type = X690Type.encoding.read(bufferReader);
        throw new UnexpectedTypeError(`No option found for type: ${type}`);
    }
    write(bufferWriter, value) {
        let option = this.options.find(option => option.contentEncoding.can(value));
        if (!option)
            throw new UnexpectedTypeError(`No option found`);
        option.write(bufferWriter, value);
    }
}

export default (...options) => new Choice(options);