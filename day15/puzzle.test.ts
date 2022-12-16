import { describe, expect, it } from "bun:test";
import { solvePartOne, solvePartTwo } from "./puzzle";

const input = await Bun.file("./input-test.txt").text();

describe("Day 15", () => {
  it("should solve part 1", () => {
    expect(solvePartOne(input, 10)).toBe(26);
  });
  it("should solve part 2", () => {
    expect(solvePartTwo(input, 20)).toBe(56000011);
  });
});
