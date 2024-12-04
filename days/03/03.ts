import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  const file = "./inputs/03.txt";
  const question = new Question(file);
  const questionPart2 = new Question(file, true);

  return {
    part1: question.sum().toString(),
    part2: questionPart2.sum().toString(),
  };
}

/**
 * Processed question response
 */
export class Question {
  /** an array of sections identified */
  private sections: Array<Section> = [];

  /**
   * @param file to process for sections
   */
  constructor(file: string, condition: boolean = false) {
    for (const line of open(file)) {
      this.sections.push(new Section(line, condition));
    }
  }

  /** gathers all the sums of each section and multiplies them */
  sum(): number {
    return this
      .sections
      .map((section) => section.sum())
      .reduce((sum, mul) => sum + mul);
  }
}

/**
 * a section of corrupted data
 */
export class Section {
  /** internal representation for a row */
  private row: Array<number> = [];

  /**
   * @param line the section line to parse
   * @param conditions whether to use conditions or not on the check
   */
  constructor(line: string, conditions: boolean = false) {
    // g used for grouping all
    const mulAll = new RegExp(/mul\(\d+,\d+\)/, "g");
    const mul = new RegExp(/(\d+,\d+)/);
    const donts = new RegExp(/don't\(\).*do\(\)/);

    const skip = line.match(donts)?.[0];
    const output = skip != undefined && conditions
      ? line.replace(skip, "")
      : line;

    output.match(mulAll)?.map((match) => {
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
