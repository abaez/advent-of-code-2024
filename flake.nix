{
  description = "a deno development nix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem (system:
      let
        name = "advent-of-code";
        version = "2024";
        pkgs = import nixpkgs { inherit system; };

      in {

        # dev shell default
        devShells.default = pkgs.mkShell {
          shellHook = "";

          nativeBuildInputs = [ pkgs.deno pkgs.just pkgs.mdbook ];
        };
      });
}
