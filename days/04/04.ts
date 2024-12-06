import { Answer } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

type Matrix = Array<Array<string>>;

export class Question {
  matrix: Array<Array<string>>;

  /**
   * @param file the file to be read
   */
  constructor(file: string) {
    this.matrix = [];
  }

  sum(): number {
    return 0;
  }
}
