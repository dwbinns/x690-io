const structuredIO = require("structured-io");
const bitStringEncoding = require("../contentEncodings/bitStringEncoding");
const booleanEncoding = require("../contentEncodings/booleanEncoding");
const nullEncoding = require("../contentEncodings/nullEncoding");
const numberBigIntEncoding = require("../contentEncodings/numberBigIntEncoding");
const numberEncoding = require("../contentEncodings/numberEncoding");
const oidEncoding = require("../contentEncodings/oidEncoding");
const stringEncoding = require("../contentEncodings/stringEncoding");
const structuredEncoding = require("../contentEncodings/structuredEncoding");
const UnexpectedTypeError = require("../UnexpectedTypeError");
const x690 = require("../x690");

const X690Type = require('../X690Type');
const choice = require('./choice');
const any = require('./any');
const sized = require("../sized");


const typed = (type, contentEncoding) =>
    new class extends structuredIO.Encoding {
        type = type;
        contentEncoding = contentEncoding;

        read(bufferReader, value) {
            let foundType = X690Type.encoding.read(bufferReader, new X690Type());
            if (!foundType.equals(type)) throw new UnexpectedTypeError(`Type not expected, found: ${foundType}, expected: ${type}`);
            let result = sized(contentEncoding).read(bufferReader, value);
            //console.log(type, result);
            return result;
        }

        write(bufferWriter, value) {
            X690Type.encoding.write(bufferWriter, type);
            sized(contentEncoding).write(bufferWriter, value);
        }

    };


const boolean = typed(X690Type.universal(1), booleanEncoding());
const integer = typed(X690Type.universal(2), numberEncoding());
const bigint = typed(X690Type.universal(2), numberBigIntEncoding);
const bitString = typed(X690Type.universal(3), bitStringEncoding);
const octetString = typed(X690Type.universal(4), structuredIO.bytes());
const nullData = typed(X690Type.universal(5), nullEncoding);
const oid = typed(X690Type.universal(6), oidEncoding());
const utf8string = typed(X690Type.universal(12), stringEncoding('utf8'));
const sequence = (...components) => typed(X690Type.universal(16, true), structuredIO.sequence(...components));
const sequenceOf = component => typed(X690Type.universal(16, true), structuredIO.array(component));
const setOf = component => typed(X690Type.universal(17, true), structuredIO.array(component));
const printableString = typed(X690Type.universal(19), stringEncoding('ascii'));
const ia5String = typed(X690Type.universal(20), stringEncoding('ascii'));
const t61String = typed(X690Type.universal(22), stringEncoding('ascii'));
const utcTime = typed(X690Type.universal(23), stringEncoding("ascii"));

const anyString = choice(utf8string, printableString, ia5String, t61String);

const use = (base, content) => typed(base.type, content.contentEncoding);
const explicit = (typeCode, base) => typed(X690Type.context(typeCode), base);
const implicit = (typeCode, base) => typed(base.type.makeContext(typeCode), base.contentEncoding);






module.exports = {
    boolean,
    integer,
    bigint,
    bitString,
    octetString,
    nullData,
    oid,
    utf8string,

    sequence,
    sequenceOf,
    setOf,

    printableString,
    ia5String,
    t61String,
    utcTime,

    anyString,
    any,

    choice,
    explicit,
    implicit,
    use,
};