import { Answer, open } from "../../src/types.ts";

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
   * Reads a file provided for part1
   * @param file the file to read for data
   */
  private readPart1(file: string): DataPart1 {
    const data: DataPart1 = { first: [], second: [] };
    const fr = open(file);

    for (const line of fr) {
      const split = line.split("  ");

      const first = parseInt(split[0]);
      const second = parseInt(split[1]);

      if (isNaN(first) && isNaN(second)) {
        break;
      }

      data.first.push(first);
      data.second.push(second);
    }

    return data;
  }

  /** Get distance sum for the array */
  distanceSum(): number {
    const sorted = this.sort();
    let sum = 0;

    for (const i in sorted.first) {
      sum += Math.abs(sorted.first[i] - sorted.second[i]);
    }

    return sum;
  }

  /** Get distance sum for the two lists by multiples of same */
  distanceSame(): number {
    return 0;
  }

  /** Sort the data given for part 1 */
  private sort(): DataPart1 {
    return {
      first: this.dataPart1.first.sort(),
      second: this.dataPart1.second.sort(),
    };
  }
}

/** result method used for all other actions */
export function result(): Answer {
  const part1 = new Question("./days/01/01_part1.txt");

  return {
    part1: part1.distanceSum().toString(),
  };
}
