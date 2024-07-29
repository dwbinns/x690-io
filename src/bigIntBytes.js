export function bigintToBytes(value) {
    let bytes = [];
    while (true) {
        bytes.unshift(Number(value & 0xffn));
        if (value <= 127n && value >= -128n) break;
        value >>= 8n;
    }
    return new Uint8Array(bytes);
}

export function bytesToBigint(bytes) {
    return [...bytes]
        .reduce(
            (result, byte) => result * 256n + BigInt(byte),
            bytes[0] & 0x80 ? -1n : 0n
        )
}
