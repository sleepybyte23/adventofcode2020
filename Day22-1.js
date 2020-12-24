const fs = require('fs');

const lines = fs.readFileSync('Day22-input.txt', {encoding : 'utf-8'}).split('\n').filter(x => x);

const group = (lines) => {            
    const player1 = lines.slice(1, lines.indexOf("Player 2:")).map(x => Number(x));
    const player2 = lines.slice(lines.indexOf("Player 2:")+ 1).map(x => Number(x));    
    
    player2.map(x => Number(x));
    let k = 0;
    let j = 1;
    while(j > 0) {
        let len = player1.length > player2.length ? player2.length : player1.length;
        //console.log(player1, player2, player1[0], player2[0]);
        if(len > 0) {
            if(player1[0] > player2[0]) {
                let temp1 = player1.shift();
                let temp2 = player2.shift();
                player1.push(temp1);
                player1.push(temp2);
            } else {
                let temp1 = player2.shift();
                let temp2 = player1.shift();
                player2.push(temp1);
                player2.push(temp2);
            }
            j++;            
        } else {
            k = j;
            j = 0;            
        }     
    }    
    let arr = player1.length == 0 ? player2 : player1;
    //console.log(arr);
    let res = 0;
    for(let i = 0; i < arr.length; i++) {
        let val = arr[i] * (arr.length-i);
        //res = res + val;
        res += val;
        
    }
    console.log(res);
}

group(lines);
