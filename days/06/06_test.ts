import { assertEquals } from "jsr:@std/assert";
import { result } from "./06.ts";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});
