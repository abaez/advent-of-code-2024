import { assertEquals } from "jsr:@std/assert";
import { desc } from "./flags.ts";

Deno.test("make sure desc formats correctly", () => {
  const description = "Example works";
  const expect = `\t-e --example\t\t${description}`;
  const actual = desc("example", description);
  assertEquals(actual, expect);
});
