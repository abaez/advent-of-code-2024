import { assertEquals } from "jsr:@std/assert";
import { result } from "./24.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
