// @ts-ignore
const input = [ 2, 0, 6, 12, 1, 3 ];

/**
 * @template TValue Type of the value held by this ArrayTree
 */
class ArrayTree {
    constructor(scale) {
        this._lShift = scale;
        this._rShift = 32 - scale;
        this._depth = 32 / scale;
        this._width = Math.pow(2, scale);

        this._root = [];
    }

    /**
     * @returns {[TValue[], number]}
     * @param {number} index 
     */
    _getArr(index) {
        let arr = this._root;
        let nib = 0;
        for (let d = 0; d < this._depth; d++) {
            nib = index >>> this._rShift;

            // if this is not the last iteration, then get or create the next nested array
            if (d < this._depth - 1) {
                arr = (arr[nib] || (arr[nib] = []));
            }

            index <<= this._lShift;
        }

        return [ arr, nib ];
    }

    /**
     * @returns {TValue}
     * @param {number} index 
     */
    get(index) {
        const [ arr, nib ] = this._getArr(index);
        return arr[nib];
    }

    /**
     * @param {number} index 
     * @param {TValue} value 
     */
    set(index, value) {
        const [ arr, nib ] = this._getArr(index);
        arr[nib] = value;
    }
}

function play(rounds) {
    const memory = new ArrayTree(8);
    input.forEach((n, i) => memory.set(n, i));

    let lastNumber = input[input.length - 1];
    let lastNumberIndex = input.length - 1;
    let lastNumberLastIndex = undefined;

    for (let i = input.length; i < rounds; i++) {
        let thisNumber;
        if (lastNumberLastIndex !== undefined) {
            // number has been seen before
            thisNumber = lastNumberIndex - lastNumberLastIndex;

        } else {
            // number has never been seen before
            thisNumber = 0;

        }
        
        lastNumber = thisNumber;
        lastNumberIndex = i;
        lastNumberLastIndex = memory.get(thisNumber);

        memory.set(thisNumber, i);
    }

    return lastNumber;
}

const start1 = process.hrtime.bigint();
// @ts-ignore
const part1answer = play(2020);

const start2 = process.hrtime.bigint();
// @ts-ignore
const part2answer = play(30000000);

const end = process.hrtime.bigint();
const time1 = start2 - start1;
const time2 = end - start2;

console.log(`Part 1: The 2020th number spoken is ${ part1answer }. Solved in ${ Number((time1 / 1000000n)).toFixed(2) }ms`);
console.log(`Part 2: The 30000000th number spoken is ${ part2answer }. Solved in ${ Number((time2 / 1000000n)).toFixed(2) }ms`)