#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { DataValue, Pem } from 'x690-io';
import tree from './src/tree.js';
import { BufferReader } from "buffer-io";

const USAGE = `
x690-io pem file.pem
`;

async function main(inputFormat, input, outputFormat) {

    if (inputFormat == 'hex') {
        let data = Buffer.from(input.replace(/[^A-Fa-f0-9]/g, ""), "hex");
        let content = DataValue.read(new BufferReader(data))
        console.log(tree(content));
    } else if (inputFormat == 'pem') {
        let pem = Pem.read(await readFile(input, { encoding: 'utf8' }));
        if (outputFormat == "json") {
            let json = JSON.stringify(pem, null, 4);
            console.log(json);
        } else {
            console.log(tree(pem));
        }
    } else {
        console.log(USAGE);
    }
}

await main(...process.argv.slice(2));
