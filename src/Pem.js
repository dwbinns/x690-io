import * as base64 from "@dwbinns/base/64";
import { BufferReader } from 'buffer-io';
import { DataValue } from './DataValue.js';
import { byteSplit } from './byteFormat.js';
import { name } from './encodings/encodings.js';
import { instance } from "./encodings/instance.js";
import tree from "./tree.js";





class Section {
    // https://tools.ietf.org/html/rfc7468

    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    static encodeContent(value) {
        let dataValue = instance(value.constructor).encode(value);
        const typeName = value.constructor[name];
        // let typeName = Array.isArray(types)
        //     ? types.filter(([, type]) => type == value.constructor).map(([name]) => name).pop()
        //     : types;
        // let content = write(value);

        return new Section(typeName, dataValue.getBytes());
    }

    getContent() {
        return DataValue.read(new BufferReader(this.content));
    }


    // getType(types) {
    //     let type = Array.isArray(types)
    //     ? types.filter(([name]) => name == this.type).map(([, type]) => type).pop()
    //     : types;
    //     if (!type) throw new Error(`Unknown type: ${type}`);
    //     return type;
    // }

    decodeContent(contentEncoding) {
        return contentEncoding.decode(this.getContent());
    }

    // explain() {
    //     console.log(this.type);
    //     explain(this.content, instance(X690Element));
    // }

    write() {

        return [
            `-----BEGIN ${this.type}-----`,
            ...byteSplit(this.content, 48).map(section => base64.encode(section)),
            `-----END ${this.type}-----`,
            ''
        ].join("\n");
    }


    getChildren() {
        return [this.getContent()];
    }

    getDescription() {
        return this.type;
    }
}

export class Pem {

    static Section = Section;

    constructor(...sections) {
        this.sections = sections;
    }

    encodeSection(value) {
        this.sections.push(Section.encodeContent(value));
    }

    addSection(name, data) {
        //console.log("write section", name, data);

        this.sections.push(new Section(name, data.getBytes()));
    }

    static read(text) {
        let results = [];
        let base64Lines = null;
        let type = null;
        for (let line of text.split("\n")) {
            let match = /^-----(BEGIN|END) (.*)-----$/.exec(line.trim());
            if (match && match[1] == "END" && match[2] == type) {
                let data = base64.decode(base64Lines.join(""));
                results.push(new Section(type, data));
                base64Lines = null;

            }
            if (base64Lines) base64Lines.push(line);
            if (match && match[1] == "BEGIN") {
                type = match[2];
                base64Lines = [];
            }


        }
        return new Pem(...results);
    }

    getDescription() {
        return "input";
    }

    getChildren() {
        return this.sections;
    }

    write() {
        return this.sections.map(part => part.write()).join("");
    }


    explain() {
        this.sections.forEach(section => section.explain());
    }

    tree() {
        return tree(this);
    }
};
