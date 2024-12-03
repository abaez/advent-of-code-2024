/** constant for total days to run */
export const DAYS = 25;

/** An answer interface to support common response */
export interface Answer {
  /** part 1 answer output as a string */
  part1?: string;
  /** part 2 answer output as a string */
  part2?: string;
}

/**
 * small wrapper to make day range available
 * fully inspired by work on https://www.webdevtutor.net/blog/typescript-integer-range
 */
export function dayRange(): number[] {
  const start = 1;
  return [...Array(DAYS - start + 1).keys()].map((i) => i + start);
}

/**
 * Read a file and output each line as string
 * @param file the file to open
 */
export function open(file: string): string[] {
  const result = Deno.readTextFileSync(file).split("\n");
  // drop last line as empty
  result.pop();
  return result;
}
