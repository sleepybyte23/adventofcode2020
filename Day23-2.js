//const INPUT = [ 3, 8, 9, 1, 2, 5, 4, 6, 7 ]; // TEST input
const INPUT = [1,5,6,7,9,4,8,2,3]; // PROD input
const MOVES = 10000000;

const cups = (function () {
    const numbers = Array.from(INPUT);
    
    // init circle
    for (let idx = 0; idx < 1000000; idx++) {
        let nextIdx = idx + 1;
        if (nextIdx === 1000000) {
            nextIdx = 0;
        }
        numbers[idx] = nextIdx;
    }

    // add input
    for (let i = 0; i < INPUT.length; i++) {
        const iNum = INPUT[i];
        const nextNum = INPUT[i + 1] || INPUT.length + 1;
        numbers[iNum - 1] = nextNum - 1;
    }

    return numbers;
})();

function playAllMoves() {
    let currentCup = 0;

    for (let i = 0; i < MOVES; i++) {
        // get cups to move (and ends)
        const rCup1 = cups[currentCup];
        const rCup2 = cups[rCup1];
        const rCup3 = cups[rCup2];

        // remove cups
        cups[currentCup] = cups[rCup3];

        // find insertion point
        let insertIdx = currentCup;
        do {
            insertIdx--;
            if (insertIdx < 0) {
                insertIdx = 999999;
            }
        } while (insertIdx === rCup1 || insertIdx === rCup2 || insertIdx === rCup3);

        // insert
        const afterInsertIdx = cups[insertIdx];
        cups[insertIdx] = rCup1;
        cups[rCup3] = afterInsertIdx;

        // select new current
        currentCup = cups[currentCup];
    }
}

/* Part 2 */

playAllMoves();

const cup2Idx = cups[0];
const cup2 = cup2Idx + 1;
const cup3Idx = cups[cup2Idx];
const cup3 = cup3Idx + 1;
console.log(`Part 2: The final result is ${ cup2 } x ${ cup3 } = ${ cup2 * cup3}`);