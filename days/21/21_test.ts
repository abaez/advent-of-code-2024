import { assertEquals } from "jsr:@std/assert";
import { result } from "./21.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
