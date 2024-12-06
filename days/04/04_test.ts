import { assert, assertEquals } from "jsr:@std/assert";
import { foundXmas, Question, result } from "./04.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can size matrix", () => {
  const expect = {
    height: 5,
    width: 6,
  };
  const matrix = new Question("./samples/04_base.txt").part1;

  assertEquals(matrix.height, expect.height, "height");
  assertEquals(matrix.width, expect.width, "width");
});

Deno.test("can find xmas", () => {
  const question = new Question("./samples/04_base.txt");
  const actual = foundXmas(question.part1, 0, 2);
  assert(actual);
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
