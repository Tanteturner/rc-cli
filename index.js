#! /usr/bin/env node

import { program } from 'commander';

import convert from './commands/convert.js';
import mcfunction from './commands/mcfunction.js';

program
    .command('convert')
    .description('Convert CSV to orcf')
    .addArgument('<path>','Path to CSV')
    .action(convert)

program
    .command('mcfunction')
    .description('Generate mcfunction files from orcf')
    .addArgument('<path>','Path to orcf')
    .addArgument('<export path>','Path to export to')
    .action(mcfunction)

program.parse();