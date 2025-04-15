#! /usr/bin/env node

import { program } from 'commander';

import convert from './commands/convert.js';

program
    .command('convert')
    .description('Convert CSV to orcf')
    .addArgument('<path>','Path to CSV')
    .action(convert)

program.parse();