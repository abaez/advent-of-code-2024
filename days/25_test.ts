import { assertEquals } from "jsr:@std/assert";
import { result } from "./25.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
