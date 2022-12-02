function parseInput(input) {
    return input
      .split("\n")
      .map(moves => moves.split(" "));
}

const ROCK = "ROCK"
const PAPER = "PAPER"
const SCISSORS = "SCISSORS"


const opponentMove = {
  "A" : ROCK, 
  "B" : PAPER, 
  "C" : SCISSORS
}

const myMove = {
  "X" : ROCK, 
  "Y" : PAPER, 
  "Z" : SCISSORS
}

const shapePoint = {
  "ROCK": 1,
  "PAPER": 2,
  "SCISSORS": 3
}

const outcomePoint = {
  "WIN": 6,
  "DRAW": 3,
  "LOSS": 0
}

function getMyMove(opponent, me, part="part1") {
  if(part ==="part1"){
    return myMove[me]
  }

  if(opponent === SCISSORS && me === "Z" ||
    opponent === PAPER && me === "X" ||  
    opponent === ROCK && me === "Y") {
    return ROCK
  }
  if(opponent === ROCK && me === "Z" ||
    opponent === PAPER && me === "Y" ||  
    opponent === SCISSORS && me === "X") {
    return PAPER
  }
  if(opponent === SCISSORS && me === "Y" ||
    opponent === PAPER && me === "Z" ||  
    opponent === ROCK && me === "X") {
    return SCISSORS
  }
}

function play(opponent, me) {
  if(opponent === SCISSORS && me === ROCK ||
    opponent === PAPER && me === SCISSORS ||  
    opponent === ROCK && me === PAPER) {
    return outcomePoint.WIN
  }
  if(opponent === ROCK && me === ROCK ||
    opponent === PAPER && me === PAPER ||  
    opponent === SCISSORS && me === SCISSORS) {
    return outcomePoint.DRAW
  }
  if(me === SCISSORS && opponent === ROCK ||
    me === PAPER && opponent === SCISSORS ||  
    me === ROCK && opponent === PAPER) {
    return outcomePoint.LOSS
  }
}

function calculateScore(score, moves, part) {
  const opponent = opponentMove[moves[0]]
  const me = getMyMove(opponent, moves[1], part)
  const outcomeScore = play(opponent,me)
  const shapeScore = shapePoint[me]
  return score + outcomeScore + shapeScore
}

function solvePartOne(input) {
  return parseInput(input).reduce((score, moves) => calculateScore(score, moves, "part1")
  , 0)
}

function solvePartTwo(input) {
  return parseInput(input).reduce((score, moves) => calculateScore(score, moves, "part2")
  , 0)
}

export {solvePartOne, solvePartTwo}