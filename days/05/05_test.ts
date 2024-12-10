import { assertEquals } from "jsr:@std/assert";
import { Question, result } from "./05.ts";

const sample = "./samples/05.txt";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("get proper page", () => {
  const expect = 143;

  const question = new Question(sample);

  const actual = question.sum();

  assertEquals(actual, expect);
});

Deno.test("can get input properly", () => {
  const expect = [21, 6];

  const question = new Question(sample).pages;

  const actual = [question.sets.length, question.updates.length];

  assertEquals(actual[0], expect[0], "sets of x and y");
  assertEquals(actual[1], expect[1], "updates to run");
});
