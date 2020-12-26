const publicKeys = [ 10441485, 1004920 ]; // PROD input
//const publicKeys = [ 5764801, 17807724 ]; // TEST input 1

function runLoop(subject, loopSize) {
    let value = 1;
    for (let i = 0; i < loopSize; i++) {
        value *= subject;
        value %= 20201227;
    }
    return value;
}

function findLoopSize() {
    let value = 1;
    let loopSize = 0;

    while (!publicKeys.includes(value)) {
        loopSize++;

        value *= 7;
        value %= 20201227;
    }

    return [ loopSize, value ];
}

function findEncryptionKey() {
    const [ loopSize, value ] = findLoopSize();

    const otherPubKey = publicKeys.find(pubKey => pubKey !== value);

    return runLoop(otherPubKey, loopSize);
}

console.log(`The encryption key is ${ findEncryptionKey() }`);