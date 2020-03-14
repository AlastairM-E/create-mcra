#!/usr/bin/env node
const { argv } = require('process');

const { createBoilerplate, gen, imp, adapt } = require('./commands');

const arguments = argv.splice(2);

switch (arguments[0]) {
    case 'gen':
        gen(arguments);
        break;

    case 'imp':
        imp(arguments);
        break;
    
    case 'adapt':
        adapt(arguments);
        break;

    default:
        createBoilerplate(arguments.join(' '));
        break;
};
