import { Answer, open } from "../../src/types.ts";

/** Provides result output of day done */
export function result(): Answer {
  return {};
}

// alias for position facing direction
type Position = [x: number, y: number, facing: string];

// Guard facing to direction
const GuardDirection: Map<string, Position> = new Map([
  ["^", [0, -1, "^"]],
  [">", [1, 0, ">"]],
  ["v", [0, 1, "v"]],
  ["<", [-1, 0, "<"]],
]);

/** Question questioning */
export class Question {
  theMap: TheMap;

  constructor(file: string) {
    this.theMap = new TheMap(open(file));
  }

  sum(): number {
    const endPosition = this.theMap.pathTraversal();

    return this.theMap.route
      // get all integers on row
      .map((row) => row.reduce((sum, num) => sum + num))
      // get all columns now and sum
      .reduce((col, num) => col + num);
  }
}

/** struct for handling map motion */
class TheMap {
  /** the raw map without changing */
  private raw: Array<Array<string>> = [];
  /** the map identifying the route taken */
  readonly route: Array<Array<number>> = [];
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
      row++;
    });
  }

  /**
   * path traversal of guard from position
   */
  pathTraversal(): Position {
    const xMax = this.raw[0].length;
    const yMax = this.raw.length;

    let x = this.position[0];
    let y = this.position[1];

    while (this.inBound(x, y, xMax, yMax)) {
      const xMove = x + this.direction[0];
      const yMove = y + this.direction[1];

      // try current direction
      if (this.inBound(xMove, yMove, xMax, yMax)) {
        // change direction
        if (this.raw[yMove][xMove] == "#") {
          const direction = this.rotateDirection(this.position[2]);
          if (direction != undefined) this.direction = direction;
        } else {
          this.route[y][x] = 1;
          x = xMove;
          y = yMove;
        }
      } else {
        break;
      }
    }

    return this.position;
  }

  private inBound(x: number, y: number, xMax: number, yMax: number): boolean {
    if ((0 <= x && x < xMax) && (0 <= y && y < yMax)) return true;
    return false;
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
