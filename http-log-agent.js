const https = require("https");
const x690 = require("/home/dbinns-geospock/develop/js-ssl-dev/x690-io");
const {read} = require("/home/dbinns-geospock/develop/js-ssl-dev/structured-io");
const {appendFileSync} = require("fs");

let agent = new class extends https.Agent {
 createConnection(options, callback) {
	 let connection = super.createConnection(options, callback);
	 connection.on('secureConnect', ()=>{
		 if (process.env.SSLKEYLOGFILE) {
			 let sessionDecoded = read(connection.getSession(), x690.auto).value;
			 let logline = 'RSA Session-ID:' + sessionDecoded[3].value.toString("hex") + ' Master-Key:' + sessionDecoded[4].value.toString("hex") + '\n';
			 //let logline = `CLIENT_RANDOM ${sessionDecoded[3].value.toString("hex")} ${sessionDecoded[4].value.toString("hex")}\n`;
			 appendFileSync(process.env.SSLKEYLOGFILE, logline);
		 }
	 });
	 return connection;
 }
}();
