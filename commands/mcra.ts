#!/usr/bin/env node
export { };

const { argv } = require('process');

const createBoilerplate = require('./createBoilerplate');
const gen = require('./gen');
const imp = require('./imp');
const adapt = require('./adapt/adapt');

const args = argv.splice(2);

switch (args[0]) {
  case 'gen':
    gen(args);
    break;

  case 'imp':
    imp(args);
    break;

  case 'adapt':
    adapt(args);
    break;

  default:
    createBoilerplate(args.join(' '));
    break;
}

module.exports = {
  args,
};
