function parseInput(input) {
    return input
      .split("\n")
}

const points = {
  "A X" : 3 + 1, 
  "B Y" : 3 + 2, 
  "C Z" : 3 + 3,
  "A Z" : 0 + 3,
  "B X" : 0 + 1,
  "C Y" : 0 + 2,
  "A Y" : 6 + 2,
  "B Z" : 6 + 3,
  "C X" : 6 + 1,
}

const trueMap = {
  "A X" : "A Z", 
  "B Y" : "B Y", 
  "C Z" : "C X",
  "A Z" : "A Y",
  "B X" : "B X",
  "C Y" : "C Z",
  "A Y" : "A X",
  "B Z" : "B Z",
  "C X" : "C Y",
}

function solvePartOne(input) {
  return parseInput(input).reduce((score, moves) => score + points[moves], 0)
}

function solvePartTwo(input) {
  return parseInput(input).reduce((score, moves) => score + points[trueMap[moves]], 0)
}

export {solvePartOne, solvePartTwo}