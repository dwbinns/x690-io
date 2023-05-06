import { array, bytes, dynamic, field, instance, read, sequence } from 'structured-io';
import sized from '../sized.js';
import X690Type from '../X690Type.js';

import {
    bigint, boolean, ia5String, integer, oid, printableString, t61String,
    utcTime, utf8string
} from './primitive.js';



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
}

export default X690Element;