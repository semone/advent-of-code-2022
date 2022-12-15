import { describe, expect, it } from "bun:test";
import { solvePartOne, solvePartTwo } from "./puzzle";

const input = await Bun.file("./input-test.txt").text();

describe("Day 14", () => {
  it("should solve part 1", () => {
    expect(solvePartOne(input)).toBe(24);
  });
  it("should solve part 2", () => {
    expect(solvePartTwo(input)).toBe(93);
  });
});
