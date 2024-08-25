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
        return new Section(typeName, dataValue.getBytes());
    }

    getContent() {
        return DataValue.read(new BufferReader(this.content));
    }


    decodeContent(contentType) {
        return instance(contentType).decode(this.getContent());
    }

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

    toJSON() {
        return {
            type: this.type,
            content: this.getContent(),
        };

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

    addSection(name, content) {
        if (content instanceof ArrayBuffer) content = new Uint8Array(content);
        if (content instanceof DataValue) content = content.getBytes();
        if (!(content instanceof Uint8Array)) throw new Error("Content not Uint8Array");
        this.sections.push(new Section(name, content));
    }

    findSections(contentType) {
        return this.sections.filter(({type}) => type == contentType[name]);
    }

    findSection(contentType) {
        return this.findSections(contentType).at(0);
    }

    decodeSections(contentType) {
        return this.findSections(contentType).map(section => section.decodeContent(contentType));
    }

    decodeSection(contentType) {
        return this.findSection(contentType).decodeContent(contentType);
    }

    static read(text) {
        if (text instanceof Uint8Array) text = new TextDecoder().decode(text);
        let results = [];
        let base64Lines = null;
        let type = null;
        for (let line of text.split(/\r|\n|\r\n/)) {
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

    static fromJSON(object) {
        return new Pem(...object.map(({ type, content }) => new Section(type, DataValue.fromJSON(content).getBytes())));
    }


    explain() {
        this.sections.forEach(section => section.explain());
    }
    toJSON() {
        return this.sections;
    }



    tree() {
        return tree(this);
    }
};
