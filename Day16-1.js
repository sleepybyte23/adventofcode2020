const fs = require('fs');
const lines = fs.readFileSync('./Day16-input.txt', 'utf-8').trim().split('\n')
const fields = fs.readFileSync('./Day16-input-fields.txt', 'utf-8').trim().split('\n')


const check = (lines) => {
    //console.log(lines);
    //console.log(fields);
    let id = 0;
    let checkerArr = [];
    fields.forEach(field => {
        let fieldSplit = field.split(":");
        let type = fieldSplit[0];
        let range = fieldSplit[1].split("or");
        let range1 = range[0].trim().split("-").filter(x => Number(x));
        let range2 = range[1].trim().split("-").filter(x => Number(x));
        //console.log(range1, range2);
        for(let i = range1[0]; i <= range1[1]; i++) {
            checkerArr.push(parseInt(i));
        }
        for(let i = range2[0]; i <= range2[1]; i++) {
            checkerArr.push(parseInt(i));
        }        
    });
    let setArr = new Set(checkerArr.filter(x => Number(x)));
    //console.log(setArr);    

    let sum = 0;
    lines.forEach(line => {
        let items = line.split(',').filter(x => Number(x));
        items.forEach((item) => {                        
            if(!setArr.has(parseInt(item))) {
                sum = sum + parseInt(item);
            }            
        });        
    });
    console.log(sum);
    
}


check(lines);