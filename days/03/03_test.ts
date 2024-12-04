import { assertEquals } from "jsr:@std/assert";
import { result, Section } from "./03.ts";

const SampleData =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const NegativeData = "mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 )";

const MulCheck = "mul(44,46)";

Deno.test("can get result", () => {
  assertEquals(result(), {});
});

Deno.test("can get multiple", () => {
  const expect = 161;

  const row = new Section(SampleData);

  const actual = row.sum();

  assertEquals(actual, expect);
});

Deno.test("can process mul", () => {
  const expect = 2024;

  const row = new Section(MulCheck);

  const actual = row.sum();
  assertEquals(actual, expect);
});

Deno.test("should not multiply", () => {
  const expect = 0;

  const row = new Section(NegativeData);
  const actual = row.sum();

  assertEquals(actual, expect);
});
