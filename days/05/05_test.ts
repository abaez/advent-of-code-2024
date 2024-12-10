import { assertEquals } from "jsr:@std/assert";
import { Question } from "./05.ts";

const sample = "./samples/05.txt";

Deno.test("get proper page", () => {
  const expect = 143;

  const question = new Question(sample);

  const actual = question.sum();

  assertEquals(actual, expect);
});

Deno.test("can get input properly", () => {
  const expect = 6;

  const question = new Question(sample).pages;

  const actual = question.updates.length;

  assertEquals(actual, expect, "updates to run");
});

Deno.test("can validate is sorted", () => {
  const expect = 3;
  const question = new Question(sample);

  const sorted = question.findSorted();

  const actual = sorted.length;

  assertEquals(actual, expect);
});

Deno.test("can sum unsorted proper page", () => {
  const expect = 123;
  const question = new Question(sample);

  const sorted = question.findSorted();

  const actual = sorted.length;

  assertEquals(actual, expect);
});
