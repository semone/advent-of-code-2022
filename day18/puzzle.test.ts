import { describe, expect, it } from "bun:test";
import { solvePartOne, solvePartTwo } from "./puzzle";

const input = await Bun.file("./input-test.txt").text();

describe("Day 18", () => {
  it("should solve part 1", () => {
    expect(solvePartOne(input)).toBe(64);
  });
  it("should solve part 2", () => {
    expect(solvePartTwo(input)).toBe(58);
  });
});
