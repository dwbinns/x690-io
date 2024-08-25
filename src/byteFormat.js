import * as hex from "@dwbinns/base/hex";
import { grey } from "@dwbinns/terminal/colour";

export function byteSplit(bytes, splitSize) {
    let results = [];
    while (bytes.length > splitSize) {
        results.push(bytes.slice(0, splitSize));
        bytes = bytes.slice(splitSize);
    }
    results.push(bytes);
    return results;
}

export function byteHexSplit(bytes, ...splits) {
    if (!splits.length) return hex.encode(bytes);
    let [[length, separator, counter], ...remaining] = splits;
    return byteSplit(bytes, length)
        .map((section, index) =>
            grey(counter ? (index * length).toString(16).padStart(4, '0') + ": " : "")
            + byteHexSplit(section, ...remaining)
        )
        .join(separator);
}

export function bytesFormat(bytes) {
    return byteHexSplit(bytes, [32, "\n", true], [8, "  "], [2, " "]);
}
