function parseInput(input: string): number[][] {
  return input.split("\n").map((point) => point.split(",").map(Number));
}

function getNeighbors(voxel: number[]): number[][] {
  return [
    [voxel[0], voxel[1] + 1, voxel[2]],
    [voxel[0], voxel[1] - 1, voxel[2]],
    [voxel[0] - 1, voxel[1], voxel[2]],
    [voxel[0] + 1, voxel[1], voxel[2]],
    [voxel[0], voxel[1], voxel[2] + 1],
    [voxel[0], voxel[1], voxel[2] - 1],
  ];
}

function solvePartOne(input: string): number {
  const data = parseInput(input);
  const cubes = new Set(data.map((d) => d.toString()));
  return data
    .map((c) => getNeighbors(c).filter((n) => !cubes.has(n.toString())).length)
    .reduce((a, b) => a + b);
}

function steamCubes(
  cubes: Set<string>,
  maxPosition: number[],
  minPosition: number[]
): Set<string> {
  const steam = new Set<string>();
  const queue = [maxPosition];

  function inBounds(voxel: number[]) {
    return (
      voxel[0] >= minPosition[0] - 1 &&
      voxel[0] <= maxPosition[0] + 1 &&
      voxel[1] >= minPosition[1] - 1 &&
      voxel[1] <= maxPosition[1] + 1 &&
      voxel[2] >= minPosition[2] - 1 &&
      voxel[2] <= maxPosition[2] + 1
    );
  }

  while (queue.length > 0) {
    const current = queue.shift();
    if (steam.has(current.toString())) continue;

    const validNeighbors = getNeighbors(current).filter(
      (n) => !cubes.has(n.toString()) && !steam.has(n.toString()) && inBounds(n)
    );
    queue.push(...validNeighbors);
    steam.add(current.toString());
  }

  return steam;
}

function solvePartTwo(input: string): number {
  const data = parseInput(input);
  const cubes = new Set(data.map((d) => d.toString()));

  const maxPosition = data.reduce(
    (max, curr) => [
      Math.max(curr[0], max[0]),
      Math.max(curr[1], max[1]),
      Math.max(curr[2], max[2]),
    ],
    data[0]
  );
  const minPosition = data.reduce(
    (min, curr) => [
      Math.min(curr[0], min[0]),
      Math.min(curr[1], min[1]),
      Math.min(curr[2], min[2]),
    ],
    data[0]
  );

  const steam = steamCubes(cubes, maxPosition, minPosition);
  return data
    .map((c) => getNeighbors(c).filter((n) => steam.has(n.toString())).length)
    .reduce((a, b) => a + b);
}

export { solvePartOne, solvePartTwo };
