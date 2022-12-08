function parseInput(input: string): [number[][], number[][], number[]] {
  const horizontal = input.split("\n").map((d) => [...d].map(Number));
  const vertical = transpose(horizontal);
  const size = [horizontal.length, vertical.length];
  return [horizontal, vertical, size];
}

const transpose = (arr: number[][]) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));

function solvePartOne(input: string) {
  const [horizontal, vertical, size] = parseInput(input);
  const edges = size[0] + size[1] + size[0] - 2 + size[1] - 2;
  return (
    horizontal
      .reduce((visibles: boolean[], treeLine: number[], index: number) => {
        if (index > 0 && index < size[0] - 1) {
          for (let i = 1; i < treeLine.length - 1; i++) {
            visibles.push(
              isVisible(treeLine[i], [
                treeLine.slice(0, i),
                treeLine.slice(i + 1),
                vertical[i].slice(0, index),
                vertical[i].slice(index + 1),
              ])
            );
          }
        }
        return visibles;
      }, [])
      .reduce((a, b) => (b ? a + 1 : a), 0) + edges
  );
}

function isVisible(value: number, directions: number[][]) {
  return directions.some((direction) =>
    direction.every((tree) => tree < value)
  );
}

function solvePartTwo(input: string) {
  const [horizontal, vertical, size] = parseInput(input);
  return Math.max(
    ...horizontal.reduce(
      (visible: number[], treeLine: number[], index: number) => {
        if (index > 0 && index < size[0] - 1) {
          for (let i = 1; i < treeLine.length - 1; i++) {
            const count = countVisible(treeLine[i], [
              treeLine.slice(0, i).reverse(),
              treeLine.slice(i + 1),
              vertical[i].slice(0, index).reverse(),
              vertical[i].slice(index + 1),
            ]);
            visible.push(count);
          }
        }
        return visible;
      },
      []
    )
  );
}

function countVisible(value: number, directions: number[][]): number {
  return directions
    .map((trees) => {
      let visible = 0;
      for (let i = 0; i < trees.length; i++) {
        if (trees[i] < value) {
          visible += 1;
        } else {
          visible += 1;
          break;
        }
      }
      return visible;
    })
    .reduce((a, b) => a * b);
}

export { solvePartOne, solvePartTwo };
