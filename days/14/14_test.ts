import { assertEquals } from "jsr:@std/assert";
import { result } from "./14.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
