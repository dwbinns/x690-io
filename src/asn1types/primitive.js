import { bytes } from 'structured-io';
import bitStringEncoding from '../contentEncodings/bitStringEncoding.js';
import booleanEncoding from '../contentEncodings/booleanEncoding.js';
import dateEncoding from '../contentEncodings/dateEncoding.js';
import nullEncoding from '../contentEncodings/nullEncoding.js';
import numberBigIntEncoding from '../contentEncodings/numberBigIntEncoding.js';
import numberEncoding from '../contentEncodings/numberEncoding.js';
import oidEncoding from '../contentEncodings/oidEncoding.js';
import stringEncoding from '../contentEncodings/stringEncoding.js';
import X690Type from '../X690Type.js';
import typed from './typed.js';

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

export {boolean, integer, bigint, bitString, octetString, nullData, oid, utf8string, printableString, ia5String, t61String, utcTime};