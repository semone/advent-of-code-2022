interface Data {
  cave: Cave;
  yMax: number;
}

type Cave = { [key: string]: boolean };

const parseInput = (input: string) => {
  return input
    .split("\n")
    .map((c) => c.split(" -> ").map((x) => x.split(",").map(Number)))
    .reduce(
      (res: Data, lines: number[][]) => {
        for (let i = 1; i < lines.length; i++) {
          const [x1, y1] = lines[i - 1];
          const [x2, y2] = lines[i];
          res.yMax = (y1 || y2) > res.yMax ? (y1 > y2 ? y1 : y2) : res.yMax;
          if (y1 === y2) {
            for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
              res.cave[sandStringCoord(i, y1)] = true;
            }
          }
          if (x1 == x2) {
            for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
              res.cave[sandStringCoord(x1, i)] = true;
            }
          }
        }
        return res;
      },
      { cave: {}, yMax: -1 } as Data
    );
};

const pourSand = (cave: Cave, yMax: number, part2 = false) => {
  let nrOfSand = 0;
  let stop = false;
  while (!stop) {
    let sand = { x: 500, y: 0 };
    while (true) {
      const cond = part2 ? sand.y + 1 < yMax + 2 : true;
      if (
        !cave.hasOwnProperty(JSON.stringify({ x: sand.x, y: sand.y + 1 })) &&
        cond
      ) {
        sand.y++;
      } else if (
        !cave.hasOwnProperty(
          JSON.stringify({ x: sand.x - 1, y: sand.y + 1 })
        ) &&
        cond
      ) {
        sand.x--;
      } else if (
        !cave.hasOwnProperty(
          JSON.stringify({ x: sand.x + 1, y: sand.y + 1 })
        ) &&
        cond
      ) {
        sand.x++;
      } else {
        cave[sandStringCoord(sand.x, sand.y)] = true;
        nrOfSand++;
        if (part2 && sand.y === 0 && sand.x === 500) {
          stop = true;
        }
        break;
      }
      if (!part2 && sand.y > yMax) {
        stop = true;
        break;
      }
    }
  }
  return nrOfSand;
};

const sandStringCoord = (x: number, y: number) => `{"x":${x},"y":${y}}`;

const solvePartOne = (input: string) => {
  const { cave, yMax } = parseInput(input);
  return pourSand(cave, yMax);
};

const solvePartTwo = (input: string) => {
  const { cave, yMax } = parseInput(input);
  return pourSand(cave, yMax, true);
};

export { solvePartOne, solvePartTwo };
