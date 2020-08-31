const oids = require("./oids");

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
module.exports = OID;
