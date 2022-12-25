import { solvePartOne, solvePartTwo } from "./puzzle";

const input = await Bun.file("./input.txt").text();

const part = process.env.part || "part1";

part === "part1"
  ? console.log(solvePartOne(input))
  : console.log(solvePartTwo(input));
