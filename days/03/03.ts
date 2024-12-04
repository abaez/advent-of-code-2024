import { Answer } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

/**
 * a section of corrupted data
 */
export class Section {
  /** internal representation for a row */
  private row: Array<number> = [];

  /**
   * @param line the section line to parse
   */
  constructor(line: string) {
    // g used for grouping all
    const mulAll = new RegExp(/mul\(\d+,\d+\)/, "g");
    const mul = new RegExp(/(\d+,\d+)/);

    line.match(mulAll)?.map((match) => {
      // get numbers if match by splitting and parsing the numbers
      const numbers = match
        .match(mul)?.[0]
        .split(",")
        .map((rawNumber) => parseInt(rawNumber));

      if (numbers != undefined) {
        this.row.push(numbers[0] * numbers[1]);
      }
    });
  }

  /** retrieve sum of all values */
  sum(): number {
    return this.row.length == 0
      ? 0
      : this.row.reduce((sum, value) => sum + value);
  }
}
