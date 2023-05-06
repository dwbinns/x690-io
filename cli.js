#!/usr/bin/env node
import { Pem, any } from 'x690-io';
import { explain } from 'structured-io';
import { readFile} from "node:fs/promises";

const USAGE = `
x690-io pem file.pem
`;

async function main(inputFormat, input, outputFormat) {
    if (inputFormat == 'hex') {
        let data = Buffer.from(input.replace(/:/g, ""), "hex");
        console.log(data);
        // let data=Buffer.from(await readFile(inputFile, {encoding: 'utf8'}), 'hex');
        // console.log(data.toString("hex"));
        explain(data, any);
        //console.log(JSON.stringify(read(data, any), null, 4));
    }
    else if (inputFormat == 'pem') {
        Pem.read(await readFile(input, { encoding: 'utf8' })).explain();
    } else {
        console.log(USAGE);
    }
}

await main(...process.argv.slice(2));
