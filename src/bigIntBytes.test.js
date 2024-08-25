import { signedBigintToBytes, bytesToSignedBigint } from "./bigIntBytes.js";
import { deepEqual, equal } from "node:assert/strict";
import { test } from "node:test";

const tests = [
    [0n, [0]],
    [1n, [0x01]],
    [-1n, [0xff]],
    [-128n, [0x80]],
    [127n, [0x7f]],
    [128n, [0, 0x80]],
    [-129n, [0xff, 0x7f]],
    [32767n, [0x7f, 0xff]],
    [-32768n, [0x80, 0x00]],
];

for (let [bigint, bytes] of tests) {
    test(`check: ${bigint}->bytes`, () => deepEqual(signedBigintToBytes(bigint), new Uint8Array(bytes)));
    test(`check: bytes->${bigint}`, () => equal(bytesToSignedBigint(new Uint8Array(bytes)), bigint));
}