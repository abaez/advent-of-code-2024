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
    // set up regular expression with groups
    const mul = /(?<mul>mul\((?<f>\d+),(?<s>\d+)\))/;
    const re = [
      mul,
      /(?<dont>don't\(\))/,
      /(?<do>do\(\))/,
    ]
      .map((exp) => exp.source)
      .join("|");

    // g used for grouping all
    const donts = new RegExp(re, "g");

    let enabled = true;
    line.match(donts)?.map((match) => {
      const groups = match.match(re)?.groups;

      if (groups != undefined) {
        if (conditions) {
          if (groups.dont != undefined) enabled = false;
          else if (groups.do != undefined) enabled = true;
        }
        if (groups.mul != undefined && enabled) {
          const first = parseInt(groups.f);
          const second = parseInt(groups.s);
          this.row.push(first * second);
        }
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
