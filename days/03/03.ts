import { Answer } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

/**
 * a section of corrupted data
 */
export class Section {
  private row: Array<number>;

  constructor(line: string) {
    const mulAll = new RegExp(/mul\(\d+,\d+\)/, "g");
    const mul = new RegExp(/(\d+,\d+)/);

    line.match(mulAll)?.map((match) => {
      console.log(match);
      // get numbers if match
      const numbers = line
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
    return 0;
  }
}
