import oids from './oids.js';

export class OID {
    constructor(id, name = oids.toName(id), short = oids.toShortName(id)) {
        this.id = id;
        this.name = name;
        this.short = short;
    }

    getDescription() {
        return `${this.id}: ${this.name}`;
    }

    getChildren() {
        return [];
    }

    is(id) {
        return this.id == id;
    }

    equals(other) {
        return other.id == this.id;
    }
    toJSON() {
        return this.id;
    }
    toString() {
        return `${this.id}: ${this.name}`;
    }

    static fromName(name) {
        return new OID(oids.toOID(name));
    }
}

