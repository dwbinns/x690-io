const {bytes} = require("structured-io");
const bitStringEncoding = require("../contentEncodings/bitStringEncoding");
const booleanEncoding = require("../contentEncodings/booleanEncoding");
const dateEncoding = require("../contentEncodings/dateEncoding");
const nullEncoding = require("../contentEncodings/nullEncoding");
const numberBigIntEncoding = require("../contentEncodings/numberBigIntEncoding");
const numberEncoding = require("../contentEncodings/numberEncoding");
const oidEncoding = require("../contentEncodings/oidEncoding");
const stringEncoding = require("../contentEncodings/stringEncoding");

const X690Type = require("../X690Type");
const typed = require("./typed");

const boolean = typed(X690Type.universal(1), booleanEncoding());
const integer = typed(X690Type.universal(2), numberEncoding());
const bigint = typed(X690Type.universal(2), numberBigIntEncoding);
const bitString = typed(X690Type.universal(3), bitStringEncoding);
const octetString = typed(X690Type.universal(4), bytes());
const nullData = typed(X690Type.universal(5), nullEncoding);
const oid = typed(X690Type.universal(6), oidEncoding());
const utf8string = typed(X690Type.universal(12), stringEncoding('utf8'));
const printableString = typed(X690Type.universal(19), stringEncoding('ascii'));
const ia5String = typed(X690Type.universal(20), stringEncoding('ascii'));
const t61String = typed(X690Type.universal(22), stringEncoding('ascii'));
const utcTime = typed(X690Type.universal(23), dateEncoding());

module.exports = {boolean, integer, bigint, bitString, octetString, nullData, oid, utf8string, printableString, ia5String, t61String, utcTime};