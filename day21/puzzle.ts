function parseInput(input: string) {
  return input
    .split("\n")
    .map((r) => r.split(": "))
    .reduce((v, next) => {
      v[next[0]] = Number(next[1]) || next[1];
      return v;
    }, {});
}

type MonkeyList = Record<string, number | string>;

const getOpFunc = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
  "/": (a: number, b: number) => a / b,
};

const getOperand = {
  "+": "-",
  "-": "+",
  "*": "/",
  "/": "*",
};

function getMonkeyOutput(find: string, list: MonkeyList) {
  const val = list[find];
  if (typeof val === "string") {
    const [first, operand, second] = val.split(" ");
    const a = getMonkeyOutput(first, list);
    const b = getMonkeyOutput(second, list);
    if (Number.isInteger(a) && Number.isInteger(b)) {
      return getOpFunc[operand](a, b);
    }
  } else {
    return val;
  }
}

function hasHumn(find: string, list: MonkeyList) {
  const key = list[find];
  if (typeof key === "string") {
    const [first, _, second] = key.split(" ");
    if (first === "humn" || second === "humn") {
      return true;
    } else {
      return hasHumn(first, list) || hasHumn(second, list);
    }
  } else {
    return false;
  }
}

function getValue(goalValue: number, find: string, list: MonkeyList) {
  const key = list[find];
  if (typeof key === "string" && find !== "humn") {
    const [first, operand, second] = key.split(" ");
    const path = getPath(first, second, list);
    if (first !== path) {
      const val = getMonkeyOutput(first, list);
      let newGoal = null;
      if (operand === "/" || operand === "-") {
        newGoal = getOpFunc[operand](val, goalValue);
      } else {
        newGoal = getOpFunc[getOperand[operand]](goalValue, val);
      }
      return getValue(newGoal, second, list);
    } else {
      const val = getMonkeyOutput(second, list);
      const newGoal = getOpFunc[getOperand[operand]](goalValue, val);
      return getValue(newGoal, first, list);
    }
  } else {
    return goalValue;
  }
}

function getPath(left: string, right: string, data: MonkeyList) {
  return hasHumn(right, data) ? right : left;
}

function solvePartOne(input: string) {
  return getMonkeyOutput("root", parseInput(input));
}

function solvePartTwo(input: string) {
  const data = parseInput(input);
  const [left, right] = data["root"].split(" + ");
  const path = getPath(left, right, data);
  const val = hasHumn(right, data)
    ? getMonkeyOutput(left, data)
    : getMonkeyOutput(right, data);

  return getValue(val, path, data);
}

export { solvePartOne, solvePartTwo };
