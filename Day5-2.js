const fs = require('fs');
const { get } = require('http');

const lines = fs.readFileSync('day5-input.txt', {encoding : 'utf-8'}).split('\n').filter(x => x);

const getSeat = (lines) => {

    let res = [];

    lines.forEach(line => {        
        let row = line.substring(0,7);
        let column = line.substring(7);
        let rowResult = getRow(row, 0, 0, 127);
        let columnResult = getColumn(column, 0, 0, 7);
        let result = (rowResult * 8) + columnResult;        
        res.push(result);        
    });        
    res.sort(function(a, b) {
        return a - b;
      });
      for(let i = 0; i < res.length -1; i++) {
        if(res[i] + 1 !== res[i+1]) {
            console.log('My ID', res[i] + 1);
        }
    }      
    console.log(Math.max(...res));
}

function getRow(str, idx, min, max) {            
    let where = str[idx];
    //console.log('before', str, where, min, max);
    let newLocation = (min + max)/2;
    //console.log(newLocation);
    if(where === "F") {
        min = min;
        max = Math.floor(newLocation);        
    }
    if(where === "B") {
        max = max;
        min = Math.ceil(newLocation);
    }
    //console.log('after', str, min, max);
    //console.log('------');
    if(min !== max) {
        return getRow(str, idx + 1, min, max);
    } else {
        return min;
    }
    //console.log(x);
}

function getColumn(str, idx, min, max) {            
    let where = str[idx];
    //console.log('before', str, where, min, max);
    let newLocation = (min + max)/2;
    //console.log(newLocation);
    if(where === "L") {
        min = min;
        max = Math.floor(newLocation);        
    }
    if(where === "R") {
        max = max;
        min = Math.ceil(newLocation);
    }
    //console.log('after', str, min, max);
    //console.log('------');
    if(min !== max) {
        return getColumn(str, idx + 1, min, max);
    } else {
        return min;
    }
    //console.log(x);
}

getSeat(lines);

