import * as hex from "@dwbinns/base/hex";

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
    let [[length, separator], ...remaining] = splits;
    return byteSplit(bytes, length).map(section => byteHexSplit(section, ...remaining)).join(separator);
}

export function bytesFormat(bytes) {
    return byteHexSplit(bytes, [32, "\n"], [8, "  "], [2, " "]);
}
