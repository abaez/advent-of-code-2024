import { Answer, open } from "../../src/types.ts";

/** result method used for all other actions */
export function result(): Answer {
  const question = new Question("./inputs/01.txt");

  return {
    part1: question.distanceSum().toString(),
    part2: question.distanceSame().toString(),
  };
}

export interface DataPart1 {
  first: Array<number>;
  second: Array<number>;
}

export interface DataPart2 {
  /** a map containing repeats from left and right */
  repeats: Map<number, [left: number, right: number]>;
}

interface QuestionOptions {
  dataPart1: DataPart1;
}

/** Store question part1 */
export class Question {
  /** the initial data for part 1 */
  readonly dataPart1: DataPart1;
  /** the data for part 2 */
  readonly dataPart2: DataPart2;

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

    this.dataPart2 = this.populatePart2();
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

  /** generate the record map for part 2 */
  private populatePart2(): DataPart2 {
    const data: DataPart2 = {
      repeats: new Map(),
    };

    // set up keys first to identify the repeats
    for (const key of this.dataPart1.first) {
      if (data.repeats.has(key)) {
        const repeats = data.repeats.get(key);

        const left = repeats?.[0] == undefined ? 1 : repeats?.[0] + 1;
        data.repeats.set(key, [left, 0]);
      } else {
        data.repeats.set(key, [1, 0]);
      }
    }

    // set up values of repeat
    for (const same of this.dataPart1.second) {
      if (data.repeats.has(same)) {
        const repeats = data.repeats.get(same);

        const left = repeats?.[0] == undefined ? 0 : repeats?.[0];
        const right = repeats?.[1] == undefined ? 1 : repeats?.[1] + 1;

        data.repeats.set(same, [left, right]);
      }
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
    let sum = 0;

    this.dataPart2.repeats.forEach(([left, right], key, _) => {
      sum += left * right * key;
    });

    return sum;
  }

  /** Sort the data given for part 1 */
  private sort(): DataPart1 {
    return {
      first: this.dataPart1.first.sort(),
      second: this.dataPart1.second.sort(),
    };
  }
}
