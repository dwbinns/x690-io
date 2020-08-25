module.exports = function integerSplit8(integer) {
    let bytes = [];
    do {
        bytes.unshift(integer & 0xff);
        integer >>= 8;
    } while (integer > 0);
    return bytes;
}
