// See x690
// https://www.itu.int/ITU-T/studygroups/com17/languages/X.690-0207.pdf

const Pem = require('./Pem');
const {promises: {readFile}} = require("fs");
//const auto = require("./auto");
const OID = require("./OID");
const X690Type = require("./X690Type");
const {explain, read} = require('structured-io');
const any = require('./asn1types/X690Element');


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

if (require.main === module) {
    main(...process.argv.slice(2)).catch(console.error);
}


module.exports = {
    ...require('./asn1types'),
    Pem,
    OID,
    X690Type,
};
