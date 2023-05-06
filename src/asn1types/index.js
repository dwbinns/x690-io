import * as structuredIO from 'structured-io';
import X690Type from '../X690Type.js';
import choice from './choice.js';
import X690Element from './X690Element.js';
import {utf8string, printableString, ia5String, t61String} from './primitive.js';
import typed from './typed.js';

const anyString = choice(utf8string, printableString, ia5String, t61String);
const any = structuredIO.instance(X690Element);

const use = (base, content) => typed(base.type, content.contentEncoding);
const explicit = (typeCode, base, defaultValue) => typed(X690Type.context(typeCode), base, defaultValue);
const implicit = (typeCode, base) => typed(base.type.makeContext(typeCode), base.contentEncoding);


export * from './constructed.js';
export * from './primitive.js';


export {

    anyString,
    any,

    choice,
    explicit,
    implicit,
    use,
};