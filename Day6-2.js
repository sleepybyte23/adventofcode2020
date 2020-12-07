const fs = require('fs');

const lines = fs.readFileSync('day6-input.txt', {encoding : 'utf-8'}).split('\n\n').filter(x => x);

const group = (lines) => {    
    let result = 0;
    lines.forEach(line => {
        const listz = line.split(/\s+/g);
        let mergeAll = '';        
        let keyValObj = {};
        listz.forEach((keyVal, idx) => {                        
            for(let i=0; i< keyVal.length; i++) {
               
                    if(keyVal[i] in keyValObj) {
                    keyValObj[keyVal[i]]++;
                    } else {
                        keyValObj[keyVal[i]] = 1;
                    }             
            }
        });               
        let k = 0;
        for (let [key, value] of Object.entries(keyValObj)) {
            if(value === listz.length) {
                k++;
            }            
        }        
        console.log(k);
        result = result + k;
        console.log('----')        ;
    });
    console.log(result);
    
}

group(lines);
