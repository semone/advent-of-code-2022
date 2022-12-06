import { readFileSync } from "fs";
import { solvePartOne, solvePartTwo } from "./puzzle.mjs"

const input = readFileSync('./input.txt', 'utf-8')

const part = process.env.part || "part1"

if (part === "part1")
    console.log(solvePartOne(input))
else
    console.log(solvePartTwo(input))