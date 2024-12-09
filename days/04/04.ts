import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  const question = new Question("./inputs/04.txt");

  return {
    part1: question.sum().toString(),
  };
}

export class Question {
  /** matrix representation of file */
  part1: Matrix;
  /** whether to handle matrix as part 2 or not */
  readonly part2: boolean;

  /**
   * @param file the file to be read
   * @param part2 whether to handle as part 2 or not
   */
  constructor(file: string, part2: boolean = false) {
    const fr = open(file);
    this.part1 = new Matrix(fr);
    this.part2 = part2;
  }

  sum(): number {
    let total = 0;

    // set word
    const word = this.part2 ? "MAS" : "XMAS";

    this.part1.raw.map((row, rowIndex) =>
      row.map((_, columnIndex) => {
        const found = foundXmas(
          this.part1,
          rowIndex,
          columnIndex,
          word,
          this.part2,
        );
        if (found[0]) total += found[1];
      })
    );

    return total;
  }
}

/**
 * Creates a character matrix
 */
class Matrix {
  /** internal matrix of characters */
  readonly raw: Array<Array<string>> = [];
  /** how wide is the matrix */
  readonly width: number = 0;
  /** how long is the matrix */
  readonly height: number = 0;

  constructor(lines: string[]) {
    lines.map((line) => {
      this.raw.push(this.toChars(line));
    });

    this.height = this.raw.length;
    this.width = this.raw[0].length;
  }

  /**
   * split line to array of characters
   */
  private toChars(line: string): Array<string> {
    return line.split("");
  }
}

/**
 * Looks for the word Xmas in 8 directions
 * @param matrix the matrix to look for the word
 * @param row the row currently looking from
 * @param column the column currently looking from
 * @param part2 whether to handle as part 2 or not
 */
export function foundXmas(
  matrix: Matrix,
  row: number,
  column: number,
  word: string = "XMAS",
  part2: boolean = false,
): [boolean, number] {
  let result: [found: boolean, count: number] = [false, 0];

  const raw = matrix.raw;
  const height = matrix.height;
  const width = matrix.width;
  const wordLength = word.length;
  // x and y are used to set the direction in which
  // word needs to be searched.
  const x = [-1, -1, -1, 0, 0, 1, 1, 1];
  const y = [-1, 0, 1, -1, 1, -1, 0, 1];

  // exit early as not start of word
  if (raw[row][column] !== word[0]) return [false, 0];

  for (let direction = 0; direction < x.length; direction++) {
    let currentX = row + x[direction];
    let currentY = column + y[direction];
    // use to check how far match has been completed
    let checkLength = 1;

    // First character is already checked, match remaining
    // characters
    for (checkLength = 1; checkLength < wordLength; checkLength++) {
      // exit for out of boundary
      if (
        currentX >= height || currentX < 0 || currentY >= width || currentY < 0
      ) break;

      // exit if no match
      if (raw[currentX][currentY] !== word[checkLength]) break;
      //  Moving in particular direction
      currentX += x[direction];
      currentY += y[direction];
    }

    // if word length matches with check length, then correct word
    if (checkLength === wordLength) {
      result[0] = true;
      result[1] += 1;
    }
  }

  return result;
}
