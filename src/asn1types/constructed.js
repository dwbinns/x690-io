import X690Type from '../X690Type.js';
import typed from './typed.js';
import * as structuredIO from 'structured-io';

const sequence = (...components) => typed(X690Type.universal(16, true), structuredIO.sequence(...components));
const sequenceOf = component => typed(X690Type.universal(16, true), structuredIO.array(component));
const setOf = component => typed(X690Type.universal(17, true), structuredIO.array(component));

export { sequence, sequenceOf, setOf };