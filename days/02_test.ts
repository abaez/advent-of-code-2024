import { assertEquals } from "jsr:@std/assert";
import { result } from "./02.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
