import { assertEquals } from "jsr:@std/assert";
import { result } from "./01.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
