import { diffStr } from "jsr:@std/internal@^1.0.5/diff-str";
import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

// alias for position facing direction
type Position = [x: number, y: number, facing: string];

// Guard facing to direction
const GuardDirection: Map<string, Position> = new Map([
  ["^", [0, 1, "^"]],
  [">", [1, 0, ">"]],
  ["v", [0, -1, "v"]],
  ["<", [-1, 0, "<"]],
]);

/** Question questioning */
export class Question {
  theMap: TheMap;

  constructor(file: string) {
    this.theMap = new TheMap(open(file));
  }

  sum(): number {
    return 0;
  }
}

/** struct for handling map motion */
class TheMap {
  /** the raw map without changing */
  private raw: Array<Array<string>> = [];
  /** the map identifying the route taken */
  private route: Array<Array<number>> = [];
  /** the direction of the guard */
  private direction: Position = [0, 0, ""];
  /** the position of the guard */
  private position: Position = [0, 0, ""];

  /**
   * @param lines the lines to be digested
   */
  constructor(lines: string[]) {
    // set the row to know where starting
    let row = 0;

    lines.map((line) => {
      const maybe = this.findDirection(line);

      if (maybe != undefined) {
        let column: number = 0;
        [this.direction, column] = maybe;
        this.position = [row, column, this.direction[2]];
      }

      const chars = line.split("");

      // zero based array for route
      this.route.push([...Array(chars.length)].map((_) => 0));

      this.raw.push(line.split(""));
    });
    row++;
  }

  /**
   * get the direction of guard
   * @param line the line to be checked
   */
  private findDirection(
    line: string,
  ): [direction: Position, index: number] | undefined {
    const facingRaw = /\^|>|v|</;
    const maybe = line.match(facingRaw);

    if (maybe?.index != undefined) {
      // location on where to start
      const direction = GuardDirection.get(maybe[0]);
      const index = line.match(facingRaw)?.index;
      if (index != undefined && direction != undefined) {
        return [direction, index];
      }
    }

    return undefined;
  }

  /**
   * rotate the direction of the guard
   */
  private rotateDirection(facing: string): Position | undefined {
    switch (facing) {
      case "^":
        return GuardDirection.get(">");
      case ">":
        return GuardDirection.get("v");
      case "v":
        return GuardDirection.get("<");
      case "<":
        return GuardDirection.get("^");
    }
  }
}
