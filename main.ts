import { result as day01 } from "./days/01/01.ts";
import { result as day02 } from "./days/02/02.ts";
import { result as day03 } from "./days/03/03.ts";
import { result as day04 } from "./days/04/04.ts";
import { result as day05 } from "./days/05/05.ts";
import { handleArgs } from "./src/flags.ts";
import { Answer, dayRange } from "./src/types.ts";

/**
 * run the command for the day
 */
function dayPrompt(day: string) {
  let result: Answer = {};

  const maybe = parseInt(day);

  if (isNaN(maybe) || maybe > 25 || maybe <= 0) {
    console.log(`ERROR: Need to provide a number between 1-25. Got: ${day}`);
    Deno.exit(1);
  }

  switch (maybe) {
    case 1:
      result = day01();
      break;

    case 2:
      result = day02();
      break;

    case 3:
      result = day03();
      break;

    case 4:
      result = day04();
      break;

    case 5:
      result = day05();
      break;

    default:
      console.log(`Day ${maybe} not yet done`);
      Deno.exit(0);
  }

  if (result.part1) {
    console.log(`Day ${maybe} Part 1 result:`);
    console.log(result.part1, "\n");
  }

  if (result.part2) {
    console.log(`Day ${maybe} Part 2 result:`);
    console.log(result.part2, "\n");
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const args = handleArgs();

  if (args.all) {
    console.log("Giving results for all days done");
    for (const day of dayRange()) {
      dayPrompt(day.toString());
    }
  } else if (args.day) {
    dayPrompt(args.day);
  } else {
    console.log("ERROR: need to give one of the flags. Use --help for help");
    Deno.exit(1);
  }
}
