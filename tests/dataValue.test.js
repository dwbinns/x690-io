Error.stackTraceLimit = Infinity;

import { Pem } from 'x690-io';
import * as assert from 'assert/strict';
import test from "node:test";


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


let csrContent = [
    {
        "type": "CERTIFICATE REQUEST",
        "content": {
            "type": "U16C",
            "content": [
                {
                    "type": "U16C",
                    "content": [
                        {
                            "type": "U2P",
                            "decode": "0"
                        },
                        {
                            "type": "U16C",
                            "content": [
                                {
                                    "type": "U17C",
                                    "content": [
                                        {
                                            "type": "U16C",
                                            "content": [
                                                {
                                                    "type": "U6P",
                                                    "decode": "2.5.4.3"
                                                },
                                                {
                                                    "type": "U12P",
                                                    "decode": "example.com"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "U17C",
                                    "content": [
                                        {
                                            "type": "U16C",
                                            "content": [
                                                {
                                                    "type": "U6P",
                                                    "decode": "1.2.840.113549.1.9.1"
                                                },
                                                {
                                                    "type": "U22P",
                                                    "decode": "admin@example.com"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "U16C",
                            "content": [
                                {
                                    "type": "U16C",
                                    "content": [
                                        {
                                            "type": "U6P",
                                            "decode": "1.2.840.10045.2.1"
                                        },
                                        {
                                            "type": "U6P",
                                            "decode": "1.2.840.10045.3.1.7"
                                        }
                                    ]
                                },
                                {
                                    "type": "U3P",
                                    "decode": "043244555e7ad1fc48a4708e277e6cf3a6ab1da383e9d40d2c67420373667b98fbac682be3edde4ec4aa763cab6f15b3473d68eb1c63ae4af02c7da66d4cf02aa9"
                                }
                            ]
                        },
                        {
                            "type": "C0C",
                            "content": [
                                {
                                    "type": "U16C",
                                    "content": [
                                        {
                                            "type": "U6P",
                                            "decode": "1.2.840.113549.1.9.14"
                                        },
                                        {
                                            "type": "U17C",
                                            "content": [
                                                {
                                                    "type": "U16C",
                                                    "content": [
                                                        {
                                                            "type": "U16C",
                                                            "content": [
                                                                {
                                                                    "type": "U6P",
                                                                    "decode": "2.5.29.17"
                                                                },
                                                                {
                                                                    "type": "U4P",
                                                                    "bytes": "301c820b6578616d706c652e636f6d820d2a2e6578616d706c652e636f6d"
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "U16C",
                    "content": [
                        {
                            "type": "U6P",
                            "decode": "1.2.840.10045.4.3.2"
                        }
                    ]
                },
                {
                    "type": "U3P",
                    "decode": "3045022064868a6a96b3e72ce549dba28e2123282249128224078683a024aa9c3cc68662022100cf9a9513992f8268331b2548a9c5c4b54c8f83ab090453cd8b782c9ed11f9b9c"
                }
            ]
        }
    }
]

await test("dataValue", async () => {
    await test('encode pem', () => {
        assert.strictEqual(
            Pem.fromJSON(csrContent).write().trim(),
            exampleCSR.trim(),
        )
    });

    await test('decode pem', () => {
        assert.deepStrictEqual(
            JSON.parse(JSON.stringify(Pem.read(exampleCSR))),
            csrContent,
        )
    });
});