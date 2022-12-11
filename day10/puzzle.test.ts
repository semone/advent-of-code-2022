import { describe, expect, it } from "bun:test";
import { solvePartOne, solvePartTwo } from "./puzzle";

const input = await Bun.file("./input-test.txt").text();
const output = await Bun.file("./output-test-part2.txt").text();

describe("Day 10", () => {
  it("should solve part 1", () => {
    expect(solvePartOne(input)).toBe(13140);
  });
  it("should solve part 2", () => {
    expect(solvePartTwo(input)).toBe(output);
  });
});
