import oids from './oids.js';

export class OID {
    constructor(id, name = oids.toName(id)) {
        this.id = id;
        this.name = name;
    }

    getDescription() {
        return `${this.id}: ${this.name}`;
    }

    getChildren() {
        return [];
    }


    equals(other) {
        return other.id == this.id;
    }

    toString() {
        return `${this.id}: ${this.name}`;
    }
}

