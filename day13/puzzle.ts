function parseInput(input: string) {
  return input
    .split("\n\n")
    .map((pair) => pair.split("\n").map((val) => JSON.parse(val)));
}

type Packet = number | number[] | Packet[];

function compareArray(left: Packet[], right: Packet[]) {
  const length = Math.max(left.length, right.length);

  for (let i = 0; i < length; i++) {
    const val = compare(left[i], right[i]);
    if (val === 0) continue;
    return val;
  }
  return 0;
}

function compare(left: Packet, right: Packet) {
  if (typeof left === "number" && typeof right === "number") {
    return left - right;
  }
  if (Array.isArray(left) && Array.isArray(right)) {
    return compareArray(left, right);
  }
  if (Array.isArray(left) && Number.isInteger(right)) {
    return compare(left, [right]);
  }
  if (Array.isArray(right) && Number.isInteger(left)) {
    return compare([left], right);
  }
  if (left === undefined) {
    return -1;
  }
  if (right === undefined) {
    return 1;
  }
  return 0;
}

function solvePartOne(input: string) {
  return parseInput(input).reduce((sum, [left, right], index) => {
    if (compare(left, right) < 0) {
      sum += index + 1;
    }
    return sum;
  }, 0);
}

function solvePartTwo(input: string) {
  const data = parseInput(input)
    .concat([[[2]], [[6]]])
    .flat()
    .sort(compare);
  const fistDivider = data.findIndex((c) => c.toString() === "2");
  const secondDivider = data.findIndex((c) => c.toString() === "6");
  return (fistDivider + 1) * (secondDivider + 1);
}

export { solvePartOne, solvePartTwo };
