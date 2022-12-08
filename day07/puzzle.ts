function parseInput(input: string) {
  return input.split("\n").filter((line) => line !== "$ ls");
}

function getSizes(input: string): { [key: string]: number } {
  let dirs = [];
  return parseInput(input).reduce((sizes, line) => {
    const [a, _, c] = line.split(" ");
    if (a === "$") {
      if (c === "/") {
        dirs.push("/");
      } else if (c === "..") {
        dirs.pop();
      } else {
        const path =
          dirs.slice(-1)[0] === "/"
            ? `${dirs.slice(-1)[0]}${c}`
            : `${dirs.slice(-1)[0]}/${c}`;
        dirs.push(path);
      }
    }
    if (Number(a)) {
      dirs.forEach((dir) => {
        sizes[dir] = Number(sizes[dir]) + Number(a) || Number(a);
      });
    }
    return sizes;
  }, {});
}

function solvePartOne(input: string) {
  return Object.values(getSizes(input)).reduce(
    (sum: number, next: number) => (next < 100000 ? (sum += next) : sum),
    0
  );
}

function solvePartTwo(input: string) {
  const sizes = getSizes(input);
  return Math.min(
    ...Object.values(getSizes(input)).filter(
      (size) => size >= 30000000 - (70000000 - sizes["/"])
    )
  );
}

export { solvePartOne, solvePartTwo };
