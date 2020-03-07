#!/usr/bin/env node
const { argv } = require('process');

const { createBoilerplate, gen, imp } = require('./commands');

const arguments = argv.splice(2);

console.log(arguments[0]);

switch (arguments[0]) {
    case 'gen':
        gen(arguments);
        break;

    case 'imp':
        imp(arguments);
        break;

    default:
        createBoilerplate(arguments.join(' '));
        break;
};