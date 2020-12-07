const fs = require('fs');

const lines = fs.readFileSync('day6-input.txt', {encoding : 'utf-8'}).split('\n\n').filter(x => x);

const group = (lines) => {    
    let result = 0;
    lines.forEach(line => {
        const listz = line.split(/\s+/g);
        let mergeAll = '';
        listz.forEach(keyVal => {
            mergeAll = mergeAll+ keyVal;            
        });        
        let lineArr = mergeAll.split('');
        let lineSet = new Set(lineArr);
        result = result + lineSet.size;        
    });
    console.log(result);
    
}

group(lines);
