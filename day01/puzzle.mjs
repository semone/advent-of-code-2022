function parseInput(input) {
  return input.split("\n\n").map(data => data.split("\n"))
}

function solvePartOne(input) {
  const data = parseInput(input)
  return Math.max(...data.map(element => element.map(e => parseInt(e)).reduce((acc, next) => next + acc)));
}

function solvePartTwo(input) {
  const data = parseInput(input)
  return data.map(element => element.map(e => parseInt(e)).reduce((acc, next) => next + acc)).sort((a, b) => a < b ? 1 : a > b ? -1 : 0).slice(0,3).reduce((acc, next) => next +acc);
}

export {solvePartOne, solvePartTwo}