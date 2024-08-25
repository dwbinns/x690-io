#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { DataValue, Pem } from 'x690-io';
import tree from './src/tree.js';
import { BufferReader } from "buffer-io";
import * as hex from "@dwbinns/base/hex";
import * as b64 from "@dwbinns/base/64";

const USAGE = `
x690-io show file.pem [json]
x690-io show hex:hexContent [json]
x690-io show b64:base64content [json]
`;

async function show(input, outputFormat) {
    if (input.startsWith('hex:')) {
        let data = hex.decode(input.slice("hex:".length).replace(/[^A-Fa-f0-9]/g, ""));
        let content = DataValue.read(new BufferReader(data))
        console.log(tree(content));
    } else if (input.startsWith('b64:')) {
        let data = b64.decode(input.slice("b64:".length));
        let content = DataValue.read(new BufferReader(data))
        console.log(tree(content));
    } else {
        let pem = Pem.read(await readFile(input, { encoding: 'utf8' }));
        if (outputFormat == "json") {
            let json = JSON.stringify(pem, null, 4);
            console.log(json);
        } else {
            console.log(tree(pem));
        }
    }
}

const commands = { show };

const [command, ...args] = process.argv.slice(2);

await commands[command](...args);
