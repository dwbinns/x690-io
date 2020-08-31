const X690Type = require("../X690Type");
const typed = require("./typed");
const structuredIO = require("structured-io");

const sequence = (...components) => typed(X690Type.universal(16, true), structuredIO.sequence(...components));
const sequenceOf = component => typed(X690Type.universal(16, true), structuredIO.array(component));
const setOf = component => typed(X690Type.universal(17, true), structuredIO.array(component));

module.exports = {sequence, sequenceOf, setOf};