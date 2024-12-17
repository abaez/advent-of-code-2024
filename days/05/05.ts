import { Answer, open } from "../../src/types.ts";

/** Page sets to be used to find mapping */
type PageSets = Map<number, Set<number>>;

/** Order of updates */
type PageUpdates = Array<Array<number>>;

/** Provides result output of day done */
export function result(): Answer {
  const question = new Question("./inputs/05.txt");
  return {
    part1: question.sum().toString(),
    part2: question.sumUnsorted().toString(),
  };
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

  /** finds all the sorted sets */
  findSorted(): PageUpdates {
    return this.pages.updates
      .filter((checkLine) => this.pages.isSorted(checkLine));
  }

  /** finds all unsorted and sort */
  findUnsorted(): PageUpdates {
    return this.pages.updates
      .filter((checkLine) => !this.pages.isSorted(checkLine))
      // sort the unsorted
      .map((unsorted) => this.pages.sort(unsorted));
  }

  /** sum all the middle value of sorted sets */
  sum(): number {
    let result = 0;

    for (const updates of this.findSorted()) {
      const middle = Math.ceil(updates.length / 2);
      result += updates[middle - 1];
    }

    return result;
  }

  /** sum all the middle value of unsorted sets sorted */
  sumUnsorted(): number {
    let result = 0;

    for (const updates of this.findUnsorted()) {
      const middle = Math.ceil(updates.length / 2);
      result += updates[middle - 1];
    }

    return result;
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
        } else {
          const set = new Set<number>([value]);
          this.sets.set(key, set);
        }
        continue;
      }

      const maybeUpdate = this.findUpdate(line);
      if (maybeUpdate !== null) {
        this.updates.push(maybeUpdate);
      }
    }
  }

  /** checks if update line is properly sorted */
  isSorted(line: Array<number>): boolean {
    return line.every((check) => {
      const gots = this.sets.get(check);
      // exit as true as number doesn't exist so can be anywhere
      if (gots == undefined) return true;

      // travel through the list until number found
      for (let next = 0; line.length; next++) {
        const compare = line[next];
        if (compare != check) {
          // found the numbe in front
          if (gots.has(compare)) return false;
        } else {
          // reached the number, so exit true
          return true;
        }
      }
    });
  }

  sort(line: Array<number>): Array<number> {
    let oneSort: Array<number> = [];

    for (let base = 0; base < line.length; base++) {
      const baseNum = line[base];
      const gots = this.sets.get(baseNum);

      // not necessary to validate
      if (gots == undefined) continue;

      for (let check = 0; check < line.length; check++) {
        const checkNum = line[check];

        if (base != check) {
          if (gots.has(checkNum)) {
            // set check numNum in original element of base
            oneSort = line.toSpliced(base, 1, checkNum);
            // now swap check with base spot
            oneSort = oneSort.toSpliced(check, 1, baseNum);

            return this.sort(oneSort);
          }
        } else {
          break;
        }
      }
    }

    return (oneSort.length == 0) ? line : oneSort;
  }

  /**
   * Gets a pageset if exists
   * @param line the string be validated
   */
  private findSet(line: string): [key: number, behind: number] | null {
    const result = line
      .match(/(\d+)\|(\d+)/)
      ?.map((num) => parseInt(num));

    // use 1st and 2nd item as initial will be the first match
    return (result == undefined) ? null : [result[1], result[2]];
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
