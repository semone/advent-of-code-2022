function parseInput(input) {
  return input.split("\n").map(pair => pair.split(",")).map(p => {
    return [p[0].split("-").map(Number),p[1].split("-").map(Number)]
  })
}

function fullyContained(ranges) {
const [range1, range2] = [...ranges]
return range1[0] >= range2[0] && range1[1] <= range2[1] || 
        range2[0] >= range1[0] &&  range2[1] <= range1[1]
}

function overlapAtAll(ranges) {
  const [range1, range2] = [...ranges]
  for (let index = range1[0]; index <= range1[1]; index++) {
    if(index >= range2[0] && index <= range2[1]){
      return true
    }
  }
}

function solvePartOne(input) {
  return parseInput(input).map(fullyContained).reduce((sum, contains) => contains ? sum + 1 : sum ,0)
}

function solvePartTwo(input) {
  return parseInput(input).map(overlapAtAll).reduce((sum, contains) => contains ? sum + 1 : sum ,0)
}

export {solvePartOne, solvePartTwo}