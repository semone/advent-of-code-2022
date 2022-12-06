import { readFileSync } from "fs";
import { solvePartOne, solvePartTwo } from "./puzzle.mjs"

const input = readFileSync('./input.txt', 'utf-8').trim()

const part = process.env.part || "part1"

part === "part1" ? console.log(solvePartOne(input)) : console.log(solvePartTwo(input))