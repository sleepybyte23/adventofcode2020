const fs = require("fs");

const lines = fs
  .readFileSync("day9-input.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Number.parseInt(x));

const encodingLine = (lines, preamble) => {
  //console.log(lines);
  for (let i = preamble; i < lines.length; i++) {
    //console.log(i, lines[i]);
    let preambleRange = lines.filter((item, idx) => {
      if (idx >= i - preamble && idx < i) {
        return item.toString();
      }
    });

    let res = isSum(lines[i], preambleRange);
    console.log(res);

  }
};

function getSum(arr, num) {
  //console.log(arr, num);
  arr.reduce(function (acc, val, idx) {
    //console.log(acc, val, idx);
    let mySum = parseInt(acc) + parseInt(val);
    //console.log(mySum, num);
    if (mySum.toString() === num.toString()) {        
      //console.log(parseInt(arr[0]) + parseInt(arr[idx]), arr[0], arr[idx], mySum, arr);
      //console.log(arr.slice(0, idx + 1));
      let www = arr.slice(0, idx + 1).sort((a,b) => a-b);
      return parseInt(www[0]) + parseInt(www[idx]);
      }
    if (mySum > num) {
    }
    return mySum;
  }, 0);
}

function isSum(num, range) {
  //console.log(num, range);
  let res = false;
  range.filter((x) => {
    let remaning = (num - x).toString();
    if (range.includes(remaning)) {
      res = true;
    }
  });
  return res;
}

encodingLine(lines, 5);
