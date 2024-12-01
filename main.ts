import { result as day01 } from "./days/01/01.ts";
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
