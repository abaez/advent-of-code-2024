import { assertEquals } from "jsr:@std/assert";
import { result } from "./16.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});