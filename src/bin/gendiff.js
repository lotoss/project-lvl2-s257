#! /usr/bin/env node

import program from 'commander';
import gendiff from '../';

program
  .version('0.1.0', '-V, --version')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

if (program.args.length === 2) {
  console.log(gendiff(...program.args));
}
