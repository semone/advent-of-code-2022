function parseInput(input: string) {
  let hash = 1;
  return input
    .split("\n")
    .map((line) =>
      line
        .replace(/(Valve | has flow rate| tunnels? leads? to valves? )/g, "")
        .split(/(;|=)/)
        .filter((x) => x !== ";" && x !== "=")
    )
    .reduce((nodes: Nodes, current: string[]) => {
      const [id, flowRate, leadsTo] = current;
      nodes[id] = {
        flowRate: Number(flowRate),
        leadsTo: leadsTo.split(", "),
      };

      if (Number(flowRate) > 0) {
        nodes[id].hash = Math.pow(2, hash);
        hash++;
      }

      return nodes;
    }, {} as Nodes);
}

type Nodes = Record<string, Node>;
type ShortestPaths = Record<string, number>;

interface Node {
  flowRate: number;
  leadsTo: string[];
  hash?: number;
}

interface Item {
  minutesLeft: number;
  current: string;
  opened: number;
  total: number;
}

const shortestKey = (from: string, to: string) => `${from}:${to}`;

function getShortestPaths(nodes: Nodes) {
  const shortestPaths = {} as ShortestPaths;
  for (const [key, value] of Object.entries(nodes)) {
    shortestPaths[shortestKey(key, key)] = 0;
    value.leadsTo.forEach((value) => {
      shortestPaths[shortestKey(key, value)] = 1;
    });
  }

  for (const i of Object.keys(nodes)) {
    for (const j of Object.keys(nodes)) {
      for (const k of Object.keys(nodes)) {
        shortestPaths[shortestKey(j, k)] = Math.min(
          shortestPaths[shortestKey(j, k)] ?? Infinity,
          (shortestPaths[shortestKey(j, i)] ?? Infinity) +
            (shortestPaths[shortestKey(i, k)] ?? Infinity)
        );
      }
    }
  }
  return shortestPaths;
}

function getPressure(input: string, time: number) {
  const data = parseInput(input);
  const shortestPaths = getShortestPaths(data);
  const nodesWithFlow = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value.flowRate > 0)
  );

  function search(minutes: number) {
    const score: number[][] = [];
    const queue: Item[] = [];
    let max = 0;
    queue.push({ current: "AA", minutesLeft: minutes, opened: 0, total: 0 });
    while (queue.length > 0) {
      const { minutesLeft, current, opened, total } = queue.pop();
      if (minutesLeft > 0) {
        score.push([opened, total]);
        max = Math.max(max, total);
        for (const [key, value] of Object.entries(nodesWithFlow)) {
          if (opened & value.hash) continue;
          const nextMinutesLeft =
            minutesLeft - shortestPaths[`${current}:${key}`] - 1;
          if (nextMinutesLeft > 0) {
            queue.push({
              opened: opened + value.hash,
              current: key,
              minutesLeft: nextMinutesLeft,
              total: total + nextMinutesLeft * value.flowRate,
            });
          }
        }
      }
    }
    return [score, max];
  }
  return search(time);
}

function solvePartOne(input: string) {
  const [_, max] = getPressure(input, 30);
  return max;
}

function solvePartTwo(input: string) {
  const [score, _] = getPressure(input, 26);
  let bestScore = 0;
  for (const [myHash, myTotal] of score as number[][]) {
    for (const [elephantHash, elephantTotal] of score as number[][]) {
      if (myTotal * 2 < bestScore) break;
      if ((myHash & elephantHash) !== 0) continue;
      bestScore = Math.max(bestScore, myTotal + elephantTotal);
    }
  }
  return bestScore;
}

export { solvePartOne, solvePartTwo };
