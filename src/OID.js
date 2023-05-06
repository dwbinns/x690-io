import oids from './oids.js';

class OID {
    constructor(id, name = oids.toName(id)) {
        this.id = id;
        this.name = name;
    }

    equals(other) {
        return other.id == this.id;
    }

    toString() {
        return `${this.id}: ${this.name}`;
    }
}
export default OID;
