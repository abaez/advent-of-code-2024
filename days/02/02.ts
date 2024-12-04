import { Answer, open } from "../../src/types.ts";

/** Maximum amount of difference between two values */
const MaxDiff = 3;

const MinDiff = 1;

/** Identifies what each row should contain */
interface ReportType {
  row: Array<number>;
  /** whether a row is safe or not */
  safe: boolean;
}

/** Implements report type */
class Report implements ReportType {
  row: Array<number>;
  safe = false;

  /**
   * @param line the raw string to produce a Row from
   * @param justOne sets whether to ignore one level wrong
   */
  constructor(line: string) {
    const split = line.split(" ");
    this.row = new Array(split.length);

    split.map((level, idx, _) => {
      const first = parseInt(level);
      // always make sure to write as long as a number
      if (!isNaN(first)) this.row[idx] = first;
    });

    this.safe = this.isSafe(this.row);
  }

  /**
   * Checks if all levels are safe or not
   */
  isSafe(row: Array<number>): boolean {
    const deltas: Array<number> = [];

    for (const i of row.keys()) {
      const first = row[i];
      const second = row[i + 1];

      if (!isNaN(second)) {
        // use delta to identify difference is between 1 or 3
        const delta = first - second;
        if (delta == 0) return false;

        deltas.push(delta);
      }
    }

    // increasing value
    let increasing = true;
    for (const delta of deltas.values()) {
      increasing = delta >= MinDiff && delta <= MaxDiff;
      if (!increasing) break;
    }
    if (increasing) return true;

    // decreasing value so check the reverse using negatives of max and min
    let decreasing = false;
    for (const delta of deltas.values()) {
      decreasing = delta <= -1 * MinDiff && delta >= -1 * MaxDiff;
      if (!decreasing) break;
    }
    if (decreasing) return true;

    return false;
  }

  /** readjust the row popping 1 error */
  readjust(): Report {
    const report = new Report("");
    report.row = this.row;
    report.safe = false;

    // element to skip
    for (const skip of this.row.keys()) {
      // iterator to run through
      const check = this.row.toSpliced(skip, 1);

      if (this.isSafe(check)) {
        report.safe = true;
        break;
      }
    }

    return report;
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
  const question = new Question("./inputs/02.txt");

  return {
    part1: question.sumSafety().toString(),
    part2: question.sumSafetyJustOne().toString(),
  };
}
