import { DataValue } from "../DataValue.js";

export const encoding = Symbol("x690Encoding");

export const name = Symbol("x690Name");

export class X690Encoding {
    constructor(annotationName) {
        this.annotationName = annotationName;
        this.location = getLocation(3);
    }
    static verify(encoding) {
        if (!(encoding instanceof this) || !encoding.canEncode || !encoding.decode || !encoding.canDecode || !encoding.encode) {
            throw new Error(`Not an x690 encoding: ${encoding?.constructor?.name}`);
        }
        return encoding;
    }

    annotateError(e) {
        if (!e.stack.includes("Defined at")) e.stack += "\nDefined at:"
        e.stack += `\n ${this.annotationName}: ${this.location}`
        return e;
    }

    isOptional() {
        return false;
    }
}

// class DefinedAt extends Error {
//     path = [];
//     toString() {return this.path.join(":");}
// }

export function getLocation(offset) {
    let prior = Error.prepareStackTrace;
    let target = {};
    Error.prepareStackTrace = (e, s) => s;
    Error.captureStackTrace(target);
    let callerStack = target.stack[offset];
    Error.prepareStackTrace = prior;
    let location = "-";
    if (callerStack) {
        let fileName = callerStack.getFileName();
        let where = fileName ? fileName : callerStack.getEvalOrigin();
        location = `${where}:${callerStack.getLineNumber()}:${callerStack.getColumnNumber()}`;
    }

    return location;
}



function namedClass(superClass, name) {
    return (new Function('superClass', `return class ${name} extends superClass {}`))(superClass);
}

export function wrap(targetClass, name, ...args) {
    let subClass = namedClass(targetClass, name);
    return new subClass(...args);
}

export class X690TypedEncoding extends X690Encoding {
    constructor(x690Type, valueClass) {
        super();
        this.type = x690Type;
        this.valueClass = valueClass;
    }

    canEncode(value) {
        return value instanceof this.valueClass;
    }

    encode(value) {
        if (this.valueClass && typeof value == "string") value = new this.valueClass(value);
        return new DataValue(this.type, this.encodeContent(value));
    }

    decode(dataValue, target) {
        if (!this.canDecode(dataValue)) throw new Error(`Incorrect type, expected: ${this.type}, found: ${dataValue?.type}`, { cause: this.location });
        return this.decodeContent(dataValue.content, target);
    }

    canDecode(dataValue) {
        return dataValue?.type && this.type.equals(dataValue.type);
    }
}

export class X690WrappedEncoding extends X690Encoding {
    constructor(encoding, name) {
        super(name);
        this.encoding = X690Encoding.verify(encoding);
    }

    decode(dataValue, target) {
        try {
            return this.encoding.decode(dataValue, target);
        } catch (e) {
            throw this.annotateError(e);
        }
    }

    encode(target) {
        try {
            return this.encoding.encode(target);
        } catch (e) {
            throw this.annotateError(e);
        }
    }

    isOptional() {
        return this.encoding.isOptional();
    }

    check(type) {
        return this.encoding.check(type);
    }

    canDecode(dataValue) {
        return this.encoding.canDecode(dataValue);
    }

    canEncode(value) {
        return this.encoding.canEncode(value);
    }
}