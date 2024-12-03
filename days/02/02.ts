import { Answer, open } from "../../src/types.ts";

/** Maximum amount of difference between two values */
const MaxDiff = 3;

/** Direction of safety */
enum Direction {
  Inc,
  Dec,
}

/** Identifies what each row should contain */
interface RowType {
  raw: Array<number>;
  /** what direction to identify safety */
  direction?: Direction;
  /** whether a row is safe or not */
  safe: boolean;
}

/** Implemtns row type */
class Row implements RowType {
  raw: Array<number>;
  safe = true;
  direction?: Direction;

  /**
   * @param line the raw string to produce a Row from
   */
  constructor(line: string) {
    const split = line.split(" ");
    this.raw = new Array(split.length);

    split.map((value, idx, arr) => {
      const first = parseInt(value);
      const second = parseInt(arr[idx + 1]);

      if (!isNaN(second)) {
        const direction = this.directionType(first, second);

        if (this.direction == undefined) {
          this.direction = direction;
        } else if (direction != this.direction) {
          this.safe = false;
        }

        if (Math.abs(first - second) > MaxDiff) this.safe = false;
      }

      // always make sure to write as long as a number
      if (!isNaN(first)) this.raw[idx] = first;
    });
  }

  /**
   * Find direction and set value
   * @param first the first number to check
   * @param second the second number to check
   */
  private directionType(first: number, second: number): Direction {
    return first > second ? Direction.Dec : Direction.Inc;
  }
}

export interface DataPart1 {
  data: Array<Row>;
}

/** Question logic */
export class Question {
  /** @field part1 data from part 1 */
  readonly part1: DataPart1;

  /**
   * @param file the file to read for data
   */
  constructor(file: string) {
    this.part1 = this.readPart1(file);
  }

  /** Find how many safe rows */
  sumSafety(): number {
    let sum = 0;

    for (const row of this.part1.data) {
      sum += row.safe ? 1 : 0;
    }

    return sum;
  }

  /**
   * Reads the part1 file provided
   * @param file  the file to read for data
   */
  private readPart1(file: string): DataPart1 {
    const output: DataPart1 = {
      data: [],
    };

    for (const line of open(file)) {
      output.data.push(new Row(line));
    }
    return output;
  }
}

/** Provides result output of day done */
export function result(): Answer {
  const question = new Question("./days/02/02.txt");

  return {
    part1: question.sumSafety().toString(),
  };
}
