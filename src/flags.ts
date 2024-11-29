import { Args, parseArgs } from "jsr:@std/cli";

/** A Type alias to for handling flags */
type Flags = Map<string, string>;

/** Small wrapper to capture arguments */
export function handleArgs(): Args {
  const flags: Flags = new Map<string, string>();
  flags.set("help", "Prints help information");
  flags.set("day", "Which day to provide, 1-25 are acceptable");
  flags.set("all", "Outputs the results for all days done");

  const stringArgs = ["day"];

  const booleanArgs = ["all"];

  const aliasArgs: Record<string, string> = {};

  for (const key of flags.keys()) {
    aliasArgs[key] = key[0];
  }

  const args = parseArgs(Deno.args, {
    alias: aliasArgs,
    string: stringArgs,
    boolean: booleanArgs,
  });

  if (args.help || Deno.args.length == 0) helpPrompt(flags);

  return args;
}

/** Help prompt */
function helpPrompt(flags: Flags) {
  console.log("aoc-2024 [OPTIONS...]\n");
  console.log("An attempt at doing Advent of Code in Deno");
  console.log("\nOPTIONS:");

  for (const key of flags.keys()) {
    console.log(desc(key, flags.get(key)));
  }

  Deno.exit(0);
}

/**
 * Provides a description for help prompt
 *
 * @param long the long flag name
 * @param description the short description of the flag
 */
export function desc(long: string, description?: string): string {
  return `\t-${long[0]} --${long}\t\t${description}`;
}
