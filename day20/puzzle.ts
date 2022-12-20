function parseInput(input: string): number[] {
  return input.split("\n").map(Number);
}

function mix(numbers: number[], nrOfTimes = 1) {
  const withIndex = numbers.map((n, i) => [n, i]);
  for (let times = 0; times < nrOfTimes; times++) {
    for (let i = 0; i < withIndex.length; i++) {
      const index = withIndex.findIndex(([_, index]) => index === i);
      const [val, _] = withIndex[index];
      withIndex.splice(index, 1);
      withIndex.splice((index + val) % withIndex.length, 0, [val, i]);
    }
  }
  const mixed = withIndex.map((a) => a[0]);
  const zeroIndex = mixed.findIndex((a) => a === 0);
  const a = (zeroIndex + 1000) % withIndex.length;
  const b = (zeroIndex + 2000) % withIndex.length;
  const c = (zeroIndex + 3000) % withIndex.length;
  return mixed[a] + mixed[b] + mixed[c];
}

function solvePartOne(input: string) {
  const data = parseInput(input);
  return mix(data);
}

function solvePartTwo(input: string) {
  const data = parseInput(input);
  const decKey = 811589153;
  const encrypt = data.map((d) => d * decKey);
  return mix(encrypt, 10);
}

export { solvePartOne, solvePartTwo };
