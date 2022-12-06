
function getProcessedIndex(input, length) {
  for (let index = 0; index < input.length-length-1; index++) {
    if(new Set([...input.slice(0 + index, index + length)]).size === length){
      return index + length
    }
  }
}

function solvePartOne(input) {
  return getProcessedIndex(input, 4)
}

function solvePartTwo(input) {
  return getProcessedIndex(input, 14)
}

export {solvePartOne, solvePartTwo}