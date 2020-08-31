const { Encoding } = require('structured-io');
const X690Type = require('../X690Type');
const UnexpectedTypeError = require('../UnexpectedTypeError');


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

module.exports = (...options) => new Choice(options);