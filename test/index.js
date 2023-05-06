Error.stackTraceLimit = Infinity;

import { any, Pem } from 'x690-io';
import { strict as assert } from 'assert';


let exampleCSR = `
-----BEGIN CERTIFICATE REQUEST-----
MIIBKzCB0gIBADA4MRQwEgYDVQQDDAtleGFtcGxlLmNvbTEgMB4GCSqGSIb3DQEJ
ARYRYWRtaW5AZXhhbXBsZS5jb20wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQy
RFVeetH8SKRwjid+bPOmqx2jg+nUDSxnQgNzZnuY+6xoK+Pt3k7EqnY8q28Vs0c9
aOscY65K8Cx9pm1M8CqpoDgwNgYJKoZIhvcNAQkOMSkwJzAlBgNVHREEHjAcggtl
eGFtcGxlLmNvbYINKi5leGFtcGxlLmNvbTAKBggqhkjOPQQDAgNIADBFAiBkhopq
lrPnLOVJ26KOISMoIkkSgiQHhoOgJKqcPMaGYgIhAM+alROZL4JoMxslSKnFxLVM
j4OrCQRTzYt4LJ7RH5uc
-----END CERTIFICATE REQUEST-----
`;


async function main() {
    let pem = Pem.read(exampleCSR);
    //pem.explain();
    let output = new Pem();
    pem.sections.forEach(section => output.addSection(section.type, pem.sections[0].decodeContent(any)));

    assert.strictEqual(output.write().trim(), exampleCSR.trim());
    console.log("Round trip test passed")
    return 0;
}

main().catch(console.error).then((code = 1) => process.exitCode = code);