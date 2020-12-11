const fs = require("fs");

const consoleCode = fs
  .readFileSync("day8-input.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => x);

function steps(arr) {
  let newArr = [];
  arr.forEach((element) => {
    let splitEle = element.split(" ");
    let obj = {};
    obj["code"] = splitEle[0];
    obj["sign"] = splitEle[1].slice(0, 1);
    obj["value"] = parseInt(splitEle[1].slice(1));
    newArr.push(obj);
  });
  //console.log(newArr);
  let accumulator = 0;
  let beenThere = [];
  for (let i = 0; i < newArr.length; i++) {
    beenThere.push(i);
    console.log(i, newArr[i]);
    if (newArr[i].code === "acc") {
      if (newArr[i].sign === "+") {
        accumulator = accumulator + newArr[i].value;
      }
      if (newArr[i].sign === "-") {
        accumulator = accumulator - newArr[i].value;
      }      
    }
    if (newArr[i].code === "jmp") {
      let x = false;
      if (newArr[i].sign === "+") {
        i = i + newArr[i].value;
        x = beenThere.includes(i);
      }
      if (newArr[i].sign === "-") {
        i = i - newArr[i].value;
        x = beenThere.includes(i);
      }
      if (x) {          
        break;
      }
      i--;
    }
    //console.log(i);
  }
  console.log(accumulator);
}

steps(consoleCode);
