//@ts-check
Error.stackTraceLimit = Infinity;

import * as x690 from 'x690-io';
import * as assert from 'assert/strict';
import test from 'node:test';

class NestedObject {
    constructor(init) {
        if (init) Object.assign(this, init);
    }
    static [x690.encoding] = x690.sequence(
        x690.field('oid', x690.oid()),
        x690.field('missing', x690.optional(x690.octetString())),
        x690.field('optional', x690.optional(x690.bigInt())),
        x690.field('text', x690.anyString()),
    );
}

class ExampleObject {
    constructor(init) {
        if (init) Object.assign(this, init);
    }
    static [x690.encoding] = x690.sequence(
        x690.field('nested', x690.instance(NestedObject)),
        x690.field('bytes', x690.octetString()),
        x690.field('bits', x690.bitString()),
        x690.field('flags', x690.flags(["a", "b", "c"])),
    );

    static [x690.name] = "EXAMPLE OBJECT";
}


let testObject = new ExampleObject({
    bytes: new Uint8Array([1, 2, 3]),
    bits: new Uint8Array([4, 5, 6]),
    nested: new NestedObject({
        oid: new x690.OID("1.1.1"),
        optional: 4n,
        text: "hello",
        missing: undefined,
    }),
    flags: {
        a: false,
        b: true,
        c: true,
    }
});


const encodedPem = `
-----BEGIN EXAMPLE OBJECT-----
MB8wDgYCKQECAQQMBWhlbGxvBAMBAgMDBAAEBQYDAgBg
-----END EXAMPLE OBJECT-----
`;


await test("encodings", async () => {
    await test('encode pem', () => {
        let output = new x690.Pem();
        output.encodeSection(testObject);

        let pemText = output.write();

        assert.equal(pemText.trim(), encodedPem.trim());
    });

    await test('decode pem', () => {
        assert.deepStrictEqual(
            x690.Pem.read(encodedPem).sections[0].decodeContent(ExampleObject),
            testObject,
        );
    });

});
