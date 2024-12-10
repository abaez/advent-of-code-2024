import { assertEquals } from "jsr:@std/assert";
import { Question, result } from "./05.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("get proper page", () => {
  const expect = 143;

  const question = new Question("./samples/05.txt");

  const actual = question.sum();

  assertEquals(actual, expect);
});
