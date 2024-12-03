import { assertEquals } from "jsr:@std/assert";
import { Question, result } from "./02.ts";

const sample = "days/02/02_sample.txt";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can read data", () => {
  const expect = [7, 6, 4, 2, 1];

  const question = new Question(sample);

  const actual = question.part1.data[0].raw;

  assertEquals(actual, expect);
});
