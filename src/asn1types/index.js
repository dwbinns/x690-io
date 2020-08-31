const structuredIO = require("structured-io");

const X690Type = require('../X690Type');
const choice = require('./choice');
const X690Element = require('./X690Element');

const constructed = require("./constructed");
const primitive = require("./primitive");
const typed = require("./typed");

const {utf8string, printableString, ia5String, t61String} = primitive;

const anyString = choice(utf8string, printableString, ia5String, t61String);
const any = structuredIO.instance(X690Element);

const use = (base, content) => typed(base.type, content.contentEncoding);
const explicit = (typeCode, base, defaultValue) => typed(X690Type.context(typeCode), base, defaultValue);
const implicit = (typeCode, base) => typed(base.type.makeContext(typeCode), base.contentEncoding);


module.exports = {
    ...primitive,
    ...constructed,

    anyString,
    any,

    choice,
    explicit,
    implicit,
    use,
};