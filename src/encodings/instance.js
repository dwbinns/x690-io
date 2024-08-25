import { DataValue } from "../DataValue.js";
import { encoding, wrap, X690Encoding, X690WrappedEncoding } from "./encodings.js";

class Instance extends X690WrappedEncoding {
    constructor(classType) {
        let instanceEncoding = X690Encoding.verify(classType[encoding]);
        super(instanceEncoding, classType.name);
        this.classType = classType;

    }
    decode(dataValue) {

        let target = new this.classType();
        super.decode(dataValue, target);
        return target;

    }
    encode(target) {
        return super.encode(target);
    }
}

//export default wrap(Instance);

export const instance = (classType) => wrap(Instance, classType.name, classType);

export function decode(bytes, classType) {
    return instance(classType).decode(DataValue.read(bytes));
}

export function encode(value) {
    return instance(value.constructor).encode(value).getBytes();
}

