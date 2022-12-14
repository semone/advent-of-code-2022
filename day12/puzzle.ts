function parseInput(input: string) {
  return input.split("\n");
}

interface Node {
  x: number;
  y: number;
  elevation: string;
  distance: number;
  visited: boolean;
}

type Point = {
  x: number;
  y: number;
};

function getClosestPath(data: string[], source: Point, destination: Point) {
  const heightMap = data.map((row, y) =>
    [...row].map(
      (elevation, x) =>
        ({ x, y, elevation, distance: 0, visited: false } as Node)
    )
  );

  const sizeY = heightMap.length;
  const sizeX = heightMap.at(0).length;

  function isInGrid(point: Point) {
    return point.x >= 0 && point.x < sizeX && point.y >= 0 && point.y < sizeY;
  }

  function isValidElevation(source: Node, destination: Node) {
    return (
      source.elevation.charCodeAt(0) - destination.elevation.charCodeAt(0) >= -1
    );
  }

  function getNeighbors(node: Node) {
    return [
      { x: node.x + 1, y: node.y },
      { x: node.x - 1, y: node.y },
      { x: node.x, y: node.y + 1 },
      { x: node.x, y: node.y - 1 },
    ]
      .filter((point) => isInGrid(point))
      .map((p) => heightMap.at(p.y).at(p.x));
  }

  heightMap.at(destination.y).at(destination.x).elevation = "z";
  heightMap.at(source.y).at(source.x).elevation = "a";
  heightMap.at(source.y).at(source.x).visited = true;

  const queue = [heightMap.at(source.y).at(source.x)];

  while (queue.length) {
    const currentNode = queue.shift();
    const neighbors = getNeighbors(currentNode);
    neighbors.forEach((neigbor) => {
      if (isValidElevation(currentNode, neigbor) && !neigbor.visited) {
        neigbor.visited = true;
        neigbor.distance = currentNode.distance + 1;
        queue.push(neigbor);
      }
    });
  }
  return heightMap.at(destination.y).at(destination.x).distance;
}

function findIndices(data: string[], value: string): Point[] {
  return data
    .map((row, y) => [...row].map((elevation, x) => ({ x, y, elevation })))
    .flat()
    .filter((d) => d.elevation === value)
    .map((m) => ({ x: m.x, y: m.y }));
}

function solvePartOne(input: string) {
  const data = parseInput(input);
  const sourcePoint = findIndices(data, "S")[0];
  const destinationPoint = findIndices(data, "E")[0];
  return getClosestPath(data, sourcePoint, destinationPoint);
}

function solvePartTwo(input: string) {
  const data = parseInput(input);
  const sourcePoints = findIndices(data, "a");
  const destinationPoint = findIndices(data, "E")[0];
  let dist = Infinity;
  for (let i = 0; i < sourcePoints.length; i++) {
    const distance = getClosestPath(data, sourcePoints[i], destinationPoint);
    dist = distance < dist && distance !== 0 ? distance : dist;
  }
  return dist;
}

export { solvePartOne, solvePartTwo };
