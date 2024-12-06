import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

export class Question {
  /** matrix representation of file */
  part1: Matrix;

  /**
   * @param file the file to be read
   */
  constructor(file: string) {
    const fr = open(file);
    this.part1 = new Matrix(fr);
  }

  sum(): number {
    return 0;
  }
}

/**
 * Creates a character matrix
 */
class Matrix {
  /** internal matrix of characters */
  readonly matrix: Array<Array<string>> = [];
  /** how wide is the matrix */
  readonly width: number = 0;
  /** how long is the matrix */
  readonly height: number = 0;

  constructor(lines: string[]) {
    lines.map((line) => {
      this.matrix.push(this.toChars(line));
    });

    this.height = this.matrix.length;
    this.width = this.matrix[0].length;
  }

  /**
   * split line to array of characters
   */
  private toChars(line: string): Array<string> {
    return line.split("");
  }
}
