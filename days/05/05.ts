import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

export class Question {
  /**
   * @param file the file to read
   */
  constructor(file: string) {
    open(file);
  }

  sum(): number {
    return 0;
  }
}
