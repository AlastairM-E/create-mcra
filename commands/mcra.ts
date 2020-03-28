#!/usr/bin/env node
export {};

const { argv } = require('process');
const path = require('path');
const fs = require('fs');
const process = require('process');

const createBoilerplate = require('./createBoilerplate');
const gen = require('./gen');
const imp = require('./imp');
const adapt = require('./adapt');



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
