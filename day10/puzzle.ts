function parseInput(input: string) {
  return input.split("\n");
}

function solvePartOne(input: string) {
  return parseInput(input).reduce(
    (res, input) => {
      function nextCycle() {
        res.cycle += 1;
        if (res.cycle % 40 === 20) {
          res.strength += res.X * res.cycle;
        }
      }
      if (input.startsWith("addx")) {
        nextCycle();
      }
      nextCycle();
      if (input.startsWith("addx")) {
        res.X += Number(input.split(" ")[1]);
      }
      return res;
    },
    { X: 1, cycle: 0, strength: 0 }
  ).strength;
}

function solvePartTwo(input: string) {
  return parseInput(input)
    .reduce(
      (res, input) => {
        function nextCycle() {
          res.cycle += 1;
          if (res.spritePosition.includes(res.cycle % 40)) {
            res.CRT += "#";
          } else {
            res.CRT += ".";
          }
          if (res.cycle % 40 === 39) {
            res.CRT += "\n";
          }
        }
        if (input.startsWith("addx")) {
          nextCycle();
        }
        nextCycle();
        if (input.startsWith("addx")) {
          res.X += Number(input.split(" ")[1]);
          res.spritePosition = [res.X - 1, res.X, res.X + 1];
        }
        return res;
      },
      { X: 1, cycle: -1, CRT: "", spritePosition: [0, 1, 2] }
    )
    .CRT.trim();
}

export { solvePartOne, solvePartTwo };
