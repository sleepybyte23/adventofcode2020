const fs = require('fs');

const lines = fs.readFileSync('day4-input.txt', {encoding : 'utf-8'}).split('\n\n').filter(x => x);

class Passport {
    static requiredField = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];

    constructor(input) {
        this.map = new Map();
        const list = input.split(/\s+/g);
        list.forEach(keyVal => {
            const  [key, value] = keyVal.split(':');
            this.map.set(key, value);
        });
    }
    
    isValid() {
        return Passport.requiredField.every(key => this.map.has(key));
    }
}

let valid = 0;

for(const line of lines) {
    const p = new Passport(line);
    if(p.isValid()) valid++;
    //console.log(p, p.isValid())
}

console.log(valid);
