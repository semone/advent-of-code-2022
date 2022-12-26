function parseInput(input: string): Direction[] {
  return input.split("") as Direction[];
}

type Direction = "<" | ">";

function getDirection(direction: Direction) {
  return direction === "<" ? -1 : 1;
}

function getRock(turn: number) {
  switch (turn % 5) {
    case 0:
      return [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ];
    case 1:
      return [
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
        [1, 2],
      ];
    case 2:
      return [
        [2, 2],
        [2, 1],
        [2, 0],
        [1, 0],
        [0, 0],
      ];
    case 3:
      return [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ];
    case 4:
      return [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ];
    default:
      break;
  }
}

function getStartPosition(rock: number[][], top: number) {
  return rock.map((p) => [p[0] + 2, p[1] + 4 + top]);
}

function play(data: Direction[], iterations: number) {
  let top = 0;
  let ticks = 0;
  let filled = [`0,0`, `1,0`, `2,0`, `3,0`, `4,0`, `5,0`, `6,0`];
  let cyclesHeight = 0;
  const state = new Map<string, number[]>();
  for (let i = 0; i < iterations; i++) {
    const rock = getRock(i);
    let pos = getStartPosition(rock, top);
    let hasHitSomething = false;

    while (!hasHitSomething) {
      const direction = getDirection(data[ticks % data.length]);
      const newX = pos.map((p) => [p[0] + direction, p[1]]);

      pos = newX.some(
        (p) => p[0] < 0 || p[0] > 6 || filled.includes(p.toString())
      )
        ? pos
        : newX;

      const newY = pos.map((p) => [p[0], p[1] - 1]);

      hasHitSomething = newY.some((p) => filled.includes(p.toString()));
      if (hasHitSomething) {
        filled = [...filled, ...pos.map((p) => p.toString())];
        const currTop = Math.max(...pos.map((p) => p[1]));

        top = Math.max(currTop, top);
      } else {
        pos = newY;
      }
      ticks++;
    }
    let patternSequence = `${i % 5}:${ticks % data.length}`;
    for (let r = top; r >= top - 5; r--) {
      let row = "";
      for (let c = 0; c < 7; c++)
        row += filled.includes(`${c},${r}`) ? "#" : ".";
      patternSequence += `:${row}`;
    }
    if (state.has(patternSequence)) {
      const [prevIteration, prevTop] = state.get(patternSequence);
      const drops = i - prevIteration;
      const height = top - prevTop;
      const cycles = Math.floor((iterations - prevIteration) / drops) - 1;
      cyclesHeight += cycles * height;
      i += cycles * drops;
    } else {
      state.set(patternSequence, [i, top]);
    }
  }
  return top + cyclesHeight;
}

function solvePartOne(input: string) {
  const data = parseInput(input);
  return play(data, 2022);
}

function solvePartTwo(input: string) {
  const data = parseInput(input);
  return play(data, 1000000000000);
}

export { solvePartOne, solvePartTwo };
