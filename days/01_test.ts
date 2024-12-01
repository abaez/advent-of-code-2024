import { assertEquals } from "jsr:@std/assert";
import { Part1Data, Question, result } from "./01.ts";

const SampleOne: Part1Data = {
  first: [3, 4, 2, 1, 3, 3],
  second: [4, 3, 5, 3, 9, 3],
};

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can get distance", () => {
  const expect = 11;

  const question = new Question("", {
    part1Data: SampleOne,
  });

  const actual = question.distanceSum();

  assertEquals(expect, actual);
});

Deno.test("can read data", () => {
  const expect: Part1Data = {
    first: [],
    second: [],
  };

  const question = new Question("", {
    part1Data: SampleOne,
  });

  assertEquals(expect, question.part1Data);
});
