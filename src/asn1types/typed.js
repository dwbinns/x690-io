const {Annotated} = require("structured-io");
const X690Type = require('../X690Type');
const sized = require("../sized");
const UnexpectedTypeError = require("../UnexpectedTypeError");


module.exports = (type, contentEncoding, defaultValue) =>
    new class extends Annotated {
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

    };
