import { Answer, open } from "../../src/types.ts";

/** Page sets to be used to find mapping */
type PageSets = Map<number, Set<number>>;

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
  sets: PageSets = new Map();
  /** what are the updates of pages */
  updates: PageUpdates = [];

  /**
   * @param rawData  data ingested and formatted accordingly
   */
  constructor(rawData: string[]) {
    for (const line of rawData) {
      const maybeSet = this.findSet(line);
      if (maybeSet !== null) {
        const [key, value] = maybeSet;
        if (this.sets.has(key)) {
          const got = this.sets.get(key)?.add(value);
          if (got != undefined) {
            this.sets.set(key, got);
          }
        }
        continue;
      }

      const maybeUpdate = this.findUpdate(line);
      if (maybeUpdate !== null) {
        this.updates.push(maybeUpdate);
      }
    }
  }

  /**
   * Gets a pageset if exists
   * @param line the string be validated
   */
  private findSet(line: string): [key: number, behind: number] | null {
    const result = line
      .match(/(\d+)\|(\d+)/g)
      ?.map((num) => parseInt(num));

    return (result == undefined) ? null : [result[0], result[1]];
  }

  /**
   * Gets an update line if exists
   * @param line the string line to be validated
   */
  private findUpdate(line: string): Array<number> | null {
    if (line.match(/,/)?.[0] != undefined) {
      return line
        .split(",")
        .map((num) => parseInt(num));
    }

    return null;
  }
}
