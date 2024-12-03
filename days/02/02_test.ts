import { assertEquals } from "jsr:@std/assert";
import { Question } from "./02.ts";

const sample = "days/02/02_sample.txt";

Deno.test("can read data", () => {
  const expect = [7, 6, 4, 2, 1];

  const question = new Question(sample);

  const actual = question.part1.data[0].raw;

  assertEquals(actual, expect);
});

Deno.test("can know safety", () => {
  const expect = 2;

  const question = new Question(sample);

  const actual = question.sumSafety();

  assertEquals(actual, expect);
});
