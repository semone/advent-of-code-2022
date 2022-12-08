function parseInput(input: string) {
  return input.split("\n").filter((line) => line !== "$ ls");
}

function getSizes(input: string): { [key: string]: number } {
  let dirs = [];
  let sizes = {};
  parseInput(input).forEach((line) => {
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
  });

  return sizes;
}

function solvePartOne(input: string) {
  const sizes = getSizes(input);
  return Object.values(sizes).reduce((sum: number, next: number) => {
    if (next < 100000) {
      sum += next;
    }
    return sum;
  }, 0);
}

function solvePartTwo(input: string) {
  const sizes = getSizes(input);
  const possibleValuesToDelete = Object.values(sizes).filter((size) => {
    return size >= 30000000 - (70000000 - sizes["/"]);
  });
  return Math.min(...possibleValuesToDelete);
}

export { solvePartOne, solvePartTwo };
