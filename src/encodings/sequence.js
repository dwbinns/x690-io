import X690Type from "../X690Type.js";
import { X690Encoding, X690TypedEncoding } from "./encodings.js";


class Sequence extends X690TypedEncoding {
    constructor(...components) {
        super(X690Type.universal(16, true));
        this.components = components.map(encoding => X690Encoding.verify(encoding));
    }
    decodeContent(content, target) {
        let index = 0;
        this.components.forEach(component =>
            component.decode(
                content[index] && (component.isOptional() ? component.canDecode(content[index]) : true)
                    ? content[index++]
                    : null,
                target
            ),
        );
        return target;
    }

    encodeContent(target) {
        return this.components.map(component => component.encode(target)).filter(Boolean);
    }

    canEncode(value) {
        return this.components.every(component => component.canEncode(value));
    }
}

export const sequence = (...components) => new Sequence(...components);



