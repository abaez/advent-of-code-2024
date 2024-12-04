# A help prompt for all targets available
@help:
  just -l

# compile the deno runtime
@build:
    deno task build

# clean up directory
@clean:
    deno task clean

# run the deno compiled setup for all
@run: 
    deno task run -a

# generate static docs
@docs:
    deno task docs

# run deno tests
@test:
    deno test --allow-read

# run deno test for a single day
@test-day day:
    deno test --allow-read ./days/{{ day }}

