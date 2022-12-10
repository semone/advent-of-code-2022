import { describe, expect, it } from "bun:test";
import { solvePartOne, solvePartTwo } from "./puzzle";

const inputPart1 = await Bun.file("./input-test-part1.txt").text();
const inputPart2 = await Bun.file("./input-test-part2.txt").text();

describe("Day 09", () => {
  it("should solve part 1", () => {
    expect(solvePartOne(inputPart1)).toBe(13);
  });
  it("should solve part 2", () => {
    expect(solvePartTwo(inputPart2)).toBe(36);
  });
});
