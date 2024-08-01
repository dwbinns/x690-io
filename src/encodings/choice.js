import { X690Encoding } from "./encodings.js";



class Choice extends X690Encoding {
    constructor(options) {
        super();
        this.options = options;
    }

    findDecodeOption(dataValue) {
        return this.options.find(option => option.canDecode(dataValue));
    }

    findEncodeOption(value) {
        return this.options.find(option => option.canEncode(value));
    }

    decode(dataValue, target) {
        if (!this.canDecode(dataValue)) throw new Error(`Incorrect type, found: ${dataValue?.type}`);
        return this.findDecodeOption(dataValue).decode(dataValue, target);
    }

    encode(value) {
        let encoder = this.findEncodeOption(value);
        if (!encoder) throw new Error("No option found for: " + value);
        return encoder.encode(value);
    }

    fromSerial(type, value) {
        let encoder = this.options.find(option => option.type?.equals(type));
        if (!encoder) throw new Error("No option found for: " + value);
        return encoder.encode(value);
    }

    canEncode(value) {
        return !!this.findEncodeOption(value);
    }

    canDecode(dataValue) {
        return !!this.findDecodeOption(dataValue);
    }
}

export const choice = (...options) => new Choice(options);



