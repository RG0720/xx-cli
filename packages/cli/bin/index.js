#! /usr/bin/env node
const { init } = require("../dist");
const program = require("commander");

async function doL() {
  const cli = await init(program, require("../package.json"));
  cli.program.parse(process.argv);
}

doL();
