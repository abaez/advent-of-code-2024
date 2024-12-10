import { Answer, open } from "../../src/types.ts";

/** set of number to match */
type PageSet = [x: number, y: number];

/** assign page ordering */
type PageSets = Array<PageSet>;

/** Order of updates */
type PageUpdates = Array<Array<number>>;

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

/** Question abstract for answers */
export class Question {
  /** the structure for pages lookup */
  pages: Pages;

  /**
   * @param file the file to read
   */
  constructor(file: string) {
    const raw = open(file);
    this.pages = new Pages(raw);
  }

  sum(): number {
    return 0;
  }
}

/**
 * Pages to be checked
 */
class Pages {
  /** the page sets used for figuring order */
  sets: PageSets = [];
  /** what are the updates of pages */
  updates: PageUpdates = [];

  /**
   * @param rawData  data ingested and formatted accordingly
   */
  constructor(rawData: string[]) {
    for (const line of rawData) {
      const maybeSet = this.getSet(line);
      if (maybeSet !== null) {
        this.sets.push(maybeSet);
        continue;
      }

      const maybeUpdate = this.getUpdate(line);
      if (maybeUpdate !== null) {
        this.updates.push(maybeUpdate);
      }
    }
  }

  /**
   * Gets a pageset if exists
   * @param line the string be validated
   */
  getSet(line: string): PageSet | null {
    const result = line
      .match(/(\d+)\|(\d+)/g)
      ?.map((num) => parseInt(num));

    return (result == undefined) ? null : [result[0], result[1]];
  }

  /**
   * Gets an update line if exists
   * @param line the string line to be validated
   */
  getUpdate(line: string): Array<number> | null {
    if (line.match(/,/)?.[0] != undefined) {
      return line
        .split(",")
        .map((num) => parseInt(num));
    }

    return null;
  }
}
