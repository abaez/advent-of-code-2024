import { Answer, open } from "../../src/types.ts";

/** Maximum amount of difference between two values */
const MaxDiff = 3;

const MinDiff = 1;

/** Direction of safety */
enum Direction {
  Inc,
  Dec,
}

/** Identifies what each row should contain */
interface ReportType {
  row: Array<number>;
  /** what direction to identify safety */
  direction?: Direction;
  /** whether a row is safe or not */
  safe: boolean;
}

/** Implements report type */
class Report implements ReportType {
  row: Array<number>;
  safe = true;
  direction?: Direction;

  /**
   * @param line the raw string to produce a Row from
   * @param justOne sets whether to ignore one level wrong
   */
  constructor(line: string) {
    const split = line.split(" ");
    this.row = new Array(split.length);

    split.map((level, idx, arr) => {
      const first = parseInt(level);
      const second = parseInt(arr[idx + 1]);

      if (!isNaN(second)) {
        const isSafe = this.isSafe(first, second);
        if (!isSafe) this.safe = isSafe;
      }

      // always make sure to write as long as a number
      if (!isNaN(first)) this.row[idx] = first;
    });
  }

  /**
   * Checks if two levels are safe or not
   * @param first the first number to check
   * @param second the second number to check
   */
  isSafe(first: number, second: number): boolean {
    const direction = this.directionType(first, second);

    if (this.direction == undefined) {
      this.direction = direction;
    } else if (direction != this.direction) {
      return false;
    }

    if (!this.inRange(first, second)) return false;

    return true;
  }

  /** readjust the row popping 1 error */
  readjust(): Report {
    const report = new Report("");

    for (const i of this.row.keys()) {
      const [first, second] = [this.row[i], this.row[i + 1]];
      if (!isNaN(second)) {
        if (!report.isSafe(first, second)) {
          report.direction = this.direction;
          report.row = this.row.toSpliced(i, 1);
          report.safe = true;
          break;
        }
      }
    }

    report.row.map((level, idx, arr) => {
      const [first, second] = [level, arr[idx + 1]];
      if (!isNaN(second)) {
        // revert back to unsafe if more than 1 error
        if (!report.inRange(first, second)) report.safe = false;
      }
    });

    return report;
  }

  /**
   * Find direction and set value
   * @param first the first number to check
   * @param second the second number to check
   */
  private directionType(first: number, second: number): Direction {
    return first > second ? Direction.Dec : Direction.Inc;
  }

  /**
   * validate the values are in range
   * @param first the first number to check
   * @param second the second number to check
   */
  private inRange(first: number, second: number): boolean {
    const abs = Math.abs(first - second);

    return abs >= MinDiff && abs <= MaxDiff;
  }
}

export interface DataPart1 {
  data: Array<Report>;
}

/** Question logic */
export class Question {
  /** @field part1 data from part 1 */
  readonly part1: DataPart1;

  /** field part2 data from part 2 */
  part2: DataPart1;

  /**
   * @param file the file to read for data
   */
  constructor(file: string) {
    this.part1 = this.readPart1(file);
    this.part2 = this.readPart2();
  }

  /** Find how many safe rows */
  sumSafety(): number {
    let sum = 0;

    for (const report of this.part1.data) {
      sum += report.safe ? 1 : 0;
    }

    return sum;
  }

  /** Find how many safe ignoring just one error */
  sumSafetyJustOne(): number {
    let sum = this.sumSafety();

    for (const report of this.part2.data) {
      console.log(report);
      sum += report.safe ? 1 : 0;
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
      output.data.push(new Report(line));
    }
    return output;
  }

  /**
   * process the output for part 2
   */
  private readPart2(): DataPart1 {
    const negatives: DataPart1 = {
      data: [],
    };

    const reports = this.part1.data.slice();

    for (const report of reports) {
      if (!report.safe) {
        negatives.data.push(report.readjust());
      }
    }

    return negatives;
  }
}

/** Provides result output of day done */
export function result(): Answer {
  const question = new Question("./days/02/02.txt");

  return {
    part1: question.sumSafety().toString(),
  };
}
