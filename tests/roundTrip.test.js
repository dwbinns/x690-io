Error.stackTraceLimit = Infinity;

import { Pem } from 'x690-io';
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

let other = `
-----BEGIN CERTIFICATE REQUEST-----
MIIBRYHpAgEAADBAADEXADAUAAYDAFUEAwwLAGV4YW1wbGUuY29tMSMAMCAABgkA
KoZIhvcNAQkBFhEAYWRtaW5AZXhhbXBsZS5jb20wXQAwFQAGBwAqhkjOPQIBBggA
KoZIzj0DAQcDQgAABDJEVV560fxIpHCOJ35s86arHaOD6dQNLGdCA3Nme5j7rGgr
4+3eTsSqdjyrbxWzRz1o6xxjrkrwLH2mbUzwKqmgPwAwPAAGCQAqhkiG9w0BCQ4x
LQAwKgAwJwAGAwBVHREEHgAwHIILZXhhbXBsZS5jb22CDSouZXhhbXBsZS5jb20w
CwAGCAAqhkjOPQQDAgNIAAAwRQIgZIaKapaz5yzlSduijiEjKCJJEoIkB4aDoCSq
nDzGhmICIQDPmpUTmS+CaDMbJUipxcS1TI+DqwkEU82LeCye0R+bnA==
-----END CERTIFICATE REQUEST-----
`;


async function main() {
    let pem = Pem.read(exampleCSR);
    //pem.explain();
    let output = new Pem();
    pem.sections.forEach(section => output.addSection(section.type, section.getContent()));

    assert.strictEqual(output.write().trim(), exampleCSR.trim());
    console.log("Round trip test passed")
    return 0;
}

main().catch(console.error).then((code = 1) => process.exitCode = code);