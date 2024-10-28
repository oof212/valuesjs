let ValuesEnums = {
  operators: {
    add: 0, // add
    sub: 1, // subtract
    mul: 2, // multiply
    div: 3, // divide
    gt: 4, // greater than
    lt: 5, // lesser than
    eq: 6, // equal to
  },
};
class Values {
  constructor(values, identifier) {
    this.values = values;
    this.identifier = identifier;
  }

  check(value, success, fail) {
    if (this.values[value]) {
      if (success) {
        success.call();
      }
      return 1;
    } else {
      if (fail) {
        fail.call();
      } else {
        console.error(
          `Value ${value} doesn't exist in Value Table ${this.identifier}.`
        );
      }
      return 0;
    }
  }

  get(value) {
    //console.log(this.values[value])
    //console.log(value)
    if (this.values[value] != undefined) {
      let v = this.values[value];
      return v;
    } /*else if (this.values[value] == undefined) {
            console.error(`Value ${value} doesn't exist in Value Table ${this.identifier}.`)
        }*/
  }

  set(value, set) {
    //console.log(value)
    //console.log(set)
    if (this.values[value] != undefined) {
      this.values[value] = set;
    } /*else {
            console.error(`Value ${value} doesn't exist in Value Table ${this.identifier}.`)
        }*/
  }

  expr(v1, v2, operator) {
    let res;
    if (this.values[v1] != undefined && this.values[v2] != undefined) {
      if (operator == undefined) {
        console.error(`Operator not given for ${this.identifier}.expr\(\)`);
      }
      switch (operator) {
        case 0:
          res = this.values[v1] + this.values[v2];

          break;
        case 1:
          res = this.values[v1] - this.values[v2];
          break;
        case 2:
          res = this.values[v1] * this.values[v2];
          break;
        case 3:
          res = this.values[v1] / this.values[v2];
          break;
        case 4:
          if (this.values[v1] > this.values[v2]) {
            res = true;
          } else {
            res = false;
          }
          break;
        case 5:
          if (this.values[v1] < this.values[v2]) {
            res = true;
          } else {
            res = false;
          }
          break;
        case 6:
          if ((this.values[v1] = this.values[v2])) {
            res = true;
          } else {
            res = false;
          }
          break;
        case 7:
          console.log("lmaooooo");
          break;
      }
      console.log(`${this.values[v1]} aa`);
      return res;
    } else {
      console.error(
        `Values ${v1} & ${v2} don't exist in Value Table ${this.identifier}.`
      );
    }
  }
  save() {
    Object.entries(this.values).forEach(([key, value]) => {
      localStorage.setItem(`${this.identifier}_${key}`, value);
      console.log(`Saved ${key} in ${this.identifier} value table!`);
    });
  }

  load() {
    Object.keys(this.values).forEach((key) => {
      const storedValue = localStorage.getItem(`${this.identifier}_${key}`);
      if (storedValue !== null) {
        this.values[key] = isNaN(storedValue)
          ? storedValue
          : Number(storedValue);
        console.log(`Loaded ${key} in ${this.identifier} value table!`);
      }
    });
  }
  setMainValue(v) {
    if (this.values[v] != undefined) {
      
    }
  }
  reset() {
    Object.keys(this.values).forEach((i) => {
      let v = this.values[i];
      localStorage.setItem(i, 0);
      this.values[i] = Number(localStorage.getItem(i));
      console.log(`Loaded value ${i} in ${this.identifier} value table!`);
    });
    localStorage.setItem("cpc", 1);
  }
}
function ntoab(number) {
  const suffixes = [
    ["", 1],
    ["k", 1000],
    ["M", 1000000],
    ["B", 1000000000],
    ["T", 1000000000000],
    ["Qa", 1000000000000000],
    ["Qi", 1000000000000000000],
    ["Sx", 1000000000000000000000],
    ["Sp", 1000000000000000000000000],
    ["Oc", 1000000000000000000000000000],
    ["No", 1000000000000000000000000000000],
    ["De", 1000000000000000000000000000000000],
    // forgor
  ];

  for (let i = suffixes.length - 1; i >= 0; i--) {
    const [suffix, value] = suffixes[i];
    if (Math.abs(number) >= value) {
      const result = (number / value).toFixed(2);
      return result.endsWith(".00")
        ? result.slice(0, -3) + suffix
        : result + suffix;
    }
  }

  return number.toString();
}
class ValueDisplay {
  constructor(values, value, ele, identifier) {
    this.values = values;
    this.value = value;
    this.ele = ele;
    this.identifier = identifier;
  }
  check(c, e) {
    if (this.values != undefined) {
      if (this.values[this.value] != undefined) {
        if (typeof c == "function") {
          c.call();
        }
      }
    } else {
      if (e != undefined) {
        if (typeof e == "function") {
          e.call();
        }
      } else {
        console.error(`GENERIC ERROR FROM ${this.identifier}.`);
      }
    }
  }
  link() {
    if (this.values != undefined) {
      if (this.values.values[this.value] != undefined)
        this.ele.innerText = this.values.values[this.value];
    }
  }

  update() {
    if (this.values instanceof Values) {
      if (this.values != undefined) {
        if (this.values.values[this.value] != undefined) {
          this.ele.innerText = ntoab(this.values.values[this.value]);
        }
      }
    }
  }
}
