import { assertEquals } from "jsr:@std/assert";
import { Question, result } from "./04.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can have basic success", () => {
  const expect = 4;

  const question = new Question("./samples/04_base.txt");
  const actual = question.sum();

  assertEquals(actual, expect);
});

Deno.test("can use filter sample", () => {
  const expect = 18;

  const question = new Question("./samples/04_filter.txt");
  const actual = question.sum();

  assertEquals(actual, expect);
});

Deno.test("can use sample", () => {
  const expect = 18;

  const question = new Question("./samples/04.txt");
  const actual = question.sum();

  assertEquals(actual, expect);
});
