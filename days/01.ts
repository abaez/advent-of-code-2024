import { Answer } from "../src/types.ts";

export interface Part1Data {
  first: Array<number>;
  second: Array<number>;
}

interface QuestionOptions {
  part1Data: Part1Data;
}

/** Store question part1 */
export class Question {
  /** the initial data for part 1 */
  readonly part1Data: Part1Data;

  /**
   * @param file the file to read
   * @param options data to use or other options
   */
  constructor(file: string, options?: QuestionOptions) {
    if (options !== undefined) {
      this.part1Data = options.part1Data;
    } else {
      this.part1Data = this.readPart1(file);
    }
  }

  /**
   * Reads a file provided
   * @param file the file to read for data
   */
  private readPart1(file: string): Part1Data {
    return {
      first: [],
      second: [],
    };
  }

  /** get distance sum for the array */
  distanceSum(): number {
    return 0;
  }
}

/** Provides result output of day done */
export function result(): Answer {
  return {};
}
