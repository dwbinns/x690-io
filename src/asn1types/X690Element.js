const {read, bytes, instance, sequence, call, array, dynamic, field, noAnnotation} = require("structured-io");
const sized = require("../sized");
const X690Type = require("../X690Type");
const {boolean, integer, bigint, bitString, octetString, nullData, oid, utf8string, printableString, ia5String, t61String, utcTime} = require("./primitive");



class X690Element {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    explain() {
        return this.type.toString() + " " + this.decode();
    }

    decode() {
        for (let option of Object.values({boolean, integer, bigint, oid, utf8string, printableString, ia5String, t61String, utcTime})) {
            if (option.type.equals(this.type)) {
                return read(this.value, option.contentEncoding).toString();
            }
        }
        return "";
    }

    static encoding = sequence(
        field("type", instance(X690Type).unannotate()).unannotate(),
        sized(
            dynamic(({type}) =>
                field("value", type.constructed
                    ? array(instance(X690Element))
                    : bytes()
                ).unannotate()
            )
        ),
    );
};

module.exports = X690Element;