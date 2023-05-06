import { read, write, explain, instance } from 'structured-io';
import { any } from './asn1types/index.js';






class Section {
    // https://tools.ietf.org/html/rfc7468

    constructor(type, content) {
        this.type = type;
        this.content = content;
    }

    static encodeContent(types, value) {
        let typeName = Array.isArray(types)
            ? types.filter(([, type]) => type == value.constructor).map(([name]) => name).pop()
            : types;
        let content = write(value);

        return new Section(typeName, content);
    }

    getType(types) {
        let type = Array.isArray(types)
        ? types.filter(([name]) => name == this.type).map(([, type]) => type).pop()
        : types;
        if (!type) throw new Error(`Unknown type: ${type}`);
        return type;
    }

    decodeContent(types) {
        return read(this.content, this.getType(types));
    }

    explain(types = any) {
        console.log(this.type);
        explain(this.content, this.getType(types));
    }

    write() {

        return [
            `-----BEGIN ${this.type}-----`,
            ...Buffer.from(this.content).toString("base64").match(/.{1,64}/g),
            `-----END ${this.type}-----`,
            ''
        ].join("\n");
    }



}

export default class Pem {

    static Section = Section;

    constructor(...sections) {
        this.sections = sections;
    }

    addSection(types, value) {
        this.sections.push(Section.encodeContent(types, value));
    }

    static read(text) {
        let results = [];
        let base64Lines = null;
        let type = null;
        for (let line of text.split("\n")) {
            let match = /^-----(BEGIN|END) (.*)-----$/.exec(line.trim());
            if (match && match[1] == "END" && match[2] == type) {
                let data = Buffer.from(base64Lines.join(""),'base64');
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

    write() {
        return this.sections.map(part => part.write()).join("");
    }


    explain() {
        this.sections.forEach(section => section.explain());
    }
};
