function parseInput(input) {
  const data = input.split("\n\n");
  const c = data[0]
    .split("\n")
    .map((m) => m.match(/.{1,4}/g).map((t) => t.trim()))
    .reverse()
    .filter((b) => !parseInt(b))
    .map((m) => [...m]);
    
  const crates = c[0]
    .map((_, colIndex) => c.map(row => row[colIndex]))
    .map((b) =>
      b.map((c) => c.replace(/[^a-z0-9]/gi, "")).filter((c) => c !== "")
    );

  const instructions = data[1]
    .split("\n")
    .map((str) => str.replace(/\D/g, " ").split(","))
    .map((str) => str[0].trim().split(/\s+/).map(Number));

  return [crates, instructions];
}

function topOfStack(finalCrates) {
  return finalCrates.map((crate) => crate[crate.length - 1]).join("");
}

function solvePartOne(input) {
  const [crates, instructions] = parseInput(input);

  for (let index = 0; index < instructions.length; index++) {
    const [count, from, to] = instructions[index];
    for (let index = 0; index < count; index++) {
      crates[to - 1].push(crates[from - 1].pop());
    }
  }
  return topOfStack(crates);
}

function solvePartTwo(input) {
  const [crates, instructions] = parseInput(input);

  for (let index = 0; index < instructions.length; index++) {
    const [count, from, to] = instructions[index];
    crates[to - 1].push(...crates[from - 1].splice(-count, count));
  }
  return topOfStack(crates);
}

export { solvePartOne, solvePartTwo };
