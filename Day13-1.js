const fs = require('fs');
const lines = fs.readFileSync('./Day13-input.txt', 'utf-8').trim().split('\n')

const myBus = (lines) => {
    let time = lines[0];
    let busNum = lines[1].split(',').filter(x => Number(x));
    let tm = Number.MAX_VALUE;    
    busNum.forEach(element => {
        let diff = time % element;
        let previous = time - diff;
        let next = previous + parseInt(element);
        let nextDiff = next - time;    
        if(tm > nextDiff) {
            tm = nextDiff;
            let doo = next - time;
            //console.log(element, doo, doo * element);
        }    

        console.log(element, diff, previous, next, nextDiff, tm);
    });
    //console.log(time, busNum);
}

myBus(lines);