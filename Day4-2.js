const fs = require("fs");

const lines = fs
  .readFileSync("day4-input.txt", { encoding: "utf-8" })
  .split("\n\n")
  .filter((x) => x);

function isYearValid(input, start, end) {
  if (!/^\d{4}$/.test(input)) {
    return false;
  }
  const int = parseInt(input);
  if (input < start) return false;
  if (input > end) return false;
  return true;
}

const eyeColor = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

class Passport {
  static requiredField = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  static fieldValidation = {
    byr: (input) => isYearValid(input, 1920, 2002),
    iyr: (input) => isYearValid(input, 2010, 2020),
    eyr: (input) => isYearValid(input, 2020, 2030),
    hgt: (input) => {
      const cm = /^(?<value>\d+)cm$/.exec(input);
      if (cm) {
        return (
          parseInt(cm.groups.value) >= 150 && parseInt(cm.groups.value) <= 193
        );
      }
      const inch = /^(?<value>\d+)in$/.exec(input);
      if (inch) {
        return (
          parseInt(inch.groups.value) >= 59 && parseInt(inch.groups.value) <= 76
        );
      }
      return false;
    },
    hcl: (input) => /^#[0-9a-f]{6}$/.test(input),
    ecl: (input) => eyeColor.has(input),
    pid: (input) => /^\d{9}$/.test(input),
    cid: (input) => true,
  };

  constructor(input) {
    this.map = new Map();
    const list = input.split(/\s+/g);
    list.forEach((keyVal) => {
      const [key, value] = keyVal.split(":");
      if (key) this.map.set(key, value);
    });
    //console.log('map' , this.map.size);
  }

  isValid() {
    return Passport.requiredField.every((key) => this.map.has(key));
  }

  isFinalValid() {
    return (
      Passport.requiredField.every((key) => this.map.has(key)) &&
      [...this.map.entries()].every(([key, value]) =>
        Passport.fieldValidation[key](value)
      )
    );
  }
}

let valid = 0;

// for(const line of lines) {
//     const p = new Passport(line);
//     if(p.isValid()) valid++;
// }

// console.log(valid);

valid = 0;

for (const line of lines) {
  const p = new Passport(line);
  if (p.isFinalValid()) valid++;
}

console.log(valid);
