function parseInput(input: string) {
  return input
    .split("\n")
    .map((d) => d.split(" "))
    .map((d) => {
      return {
        steps: Number(d[1]),
        direction: d[0] as Direction,
      };
    });
}

interface Position {
  x: number;
  y: number;
}

type Direction = "R" | "L" | "U" | "D";

interface Instruction {
  steps: number;
  direction: Direction;
}

function move(rope: Position[], direction: Direction): Position[] {
  switch (direction) {
    case "R":
      rope[0].x++;
      break;
    case "L":
      rope[0].x--;
      break;
    case "U":
      rope[0].y++;
      break;
    case "D":
      rope[0].y--;
      break;
    default:
      new Error("Unknown direction");
  }
  return followHead(rope);
}

function isAdjecent(rope: Position[], index: number) {
  return (
    Math.abs(rope[index].x - rope[index + 1].x) <= 1 &&
    Math.abs(rope[index].y - rope[index + 1].y) <= 1
  );
}

function followHead(rope: Position[]): Position[] {
  for (let index = 0; index < rope.length - 1; index++) {
    if (!isAdjecent(rope, index)) {
      const signY = Math.sign(rope[index].y - rope[index + 1].y);
      const signX = Math.sign(rope[index].x - rope[index + 1].x);
      if (rope[index].x === rope[index + 1].x) {
        rope[index + 1].y = rope[index + 1].y + signY;
      } else if (rope[index].y === rope[index + 1].y) {
        rope[index + 1].x = rope[index + 1].x + signX;
      } else {
        rope[index + 1].x = rope[index + 1].x + signX;
        rope[index + 1].y = rope[index + 1].y + signY;
      }
    }
  }
  return rope;
}

function getNumberOfTailTiles(rope: Position[], instructions: Instruction[]) {
  const p = new Set();
  instructions.forEach((instruction) => {
    for (let step = 0; step < instruction.steps; step++) {
      rope = move(rope, instruction.direction);
      const tail = rope[rope.length - 1];
      p.add(`${tail.x},${tail.y}`);
    }
  });
  return p.size;
}

function solve(input: string, knots: number) {
  const instructions = parseInput(input);
  const rope = Array.from({ length: knots }, () => ({ x: 0, y: 0 }));
  return getNumberOfTailTiles(rope, instructions);
}

function solvePartOne(input: string) {
  return solve(input, 2);
}

function solvePartTwo(input: string) {
  return solve(input, 10);
}

export { solvePartOne, solvePartTwo };
