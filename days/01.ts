import { Answer } from "../src/types.ts";

export interface DataPart1 {
  first: Array<number>;
  second: Array<number>;
}

interface QuestionOptions {
  dataPart1: DataPart1;
}

/** Store question part1 */
export class Question {
  /** the initial data for part 1 */
  readonly dataPart1: DataPart1;

  /**
   * @param file the file to read
   * @param options data to use or other options
   */
  constructor(file: string, options?: QuestionOptions) {
    if (options !== undefined) {
      this.dataPart1 = options.dataPart1;
    } else {
      this.dataPart1 = this.readPart1(file);
    }
  }

  /**
   * Reads a file provided
   * @param file the file to read for data
   */
  private readPart1(file: string): DataPart1 {
    return {
      first: [],
      second: [],
    };
  }

  /** get distance sum for the array */
  distanceSum(): number {
    return 0;
  }

  /** sort the data given */
  sort(): DataPart1 {
    return {
      first: this.dataPart1.first.sort(),
      second: this.dataPart1.second.sort(),
    };
  }
}

export function result(): Answer {
  return {};
}
