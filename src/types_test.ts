import { assertEquals } from "jsr:@std/assert";
import * as types from "./types.ts";

Deno.test("validate range is correct", () => {
  assertEquals(types.dayRange().length, types.DAYS);
});

Deno.test("validate Answer is not changed", () => {
  const expect = {
    part1: "works",
    part2: "works",
  };

  const actual: types.Answer = {
    part1: expect.part1,
    part2: expect.part2,
  };

  assertEquals(actual, expect);
});
