function parseInput(input) {
    return input.split("\n")
}


function getPriority(commonItem) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"
  let priority = [...alphabet].findIndex(item => item.toLowerCase() === commonItem.toLowerCase())
  if(commonItem === commonItem.toUpperCase()) {
    priority += 26
  }
  return priority + 1 
}

function solvePartOne(input) {
  return parseInput(input)
    .map(rucksack => {
      const middle = Math.floor(rucksack.length / 2)
      return  rucksack.slice(0, middle) + ' ' + rucksack.slice(middle, rucksack.length);
    })
    .map(items => items.split(" "))
    .map(compartments => {
      const commonItem = [...compartments[0]].find(item => compartments[1].includes(item))
      return getPriority(commonItem)
    })
    .reduce((sum, val) => sum + val, 0);
}

function solvePartTwo(input) {
  let prioritySum = 0
  const data = parseInput(input)
  
  for (let i = 0; i < data.length; i += 3) {
    const group = data.slice(i, i + 3);
    const commonItem = [...[...group[0]].filter(item => group[1].includes(item))].find(item => group[2].includes(item))
    prioritySum += getPriority(commonItem)
  } 

  return prioritySum;
}

export {solvePartOne, solvePartTwo}