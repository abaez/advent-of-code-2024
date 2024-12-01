import { assertEquals } from "jsr:@std/assert";
import { DataPart1, Question, result } from "./01.ts";

const SamplePart1: DataPart1 = {
  first: [3, 4, 2, 1, 3, 3],
  second: [4, 3, 5, 3, 9, 3],
};

const sample = "01_sample.txt";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can read data", () => {
  const expect = SamplePart1;

  const question = new Question(sample);

  assertEquals(expect, question.dataPart1);
});

Deno.test("can get distance", () => {
  const expect = 11;

  const question = new Question(sample, {
    dataPart1: SamplePart1,
  });

  const actual = question.distanceSum();

  assertEquals(expect, actual);
});
