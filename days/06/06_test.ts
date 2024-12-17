import { assertEquals } from "jsr:@std/assert";
import { result } from "./06.ts";

const sample = "./samples/06.txt";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can traverse 90%", () => {
  const expect = 41;

  const question = new Question(sample);

  const actual = question.sum();

  assertEquals(actual, expect);
});
