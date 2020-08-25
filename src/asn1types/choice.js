const { Encoding } = require('structured-io');
const UnexpectedTypeError = require('../UnexpectedTypeError');


function choice(...options) {
    return new class extends Encoding {
        read(bufferReader, value) {
            for (let option of options) {
                try {
                    return option.read(bufferReader, value);
                } catch (e) {
                    if (!(e instanceof UnexpectedTypeError))
                        throw e;
                }
            }
            throw new UnexpectedTypeError(`No option found`);
        }
        write(bufferWriter, value) {
            let option = options.find(option => option.contentEncoding.can(value));
            if (!option)
                throw new UnexpectedTypeError(`No option found`);
            option.write(bufferWriter, value);
        }
    };
}
module.exports = choice;