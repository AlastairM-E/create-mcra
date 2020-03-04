#!/usr/bin/env node
const { execSync } = require('child_process');
const { argv } = require('process');

const arguments = argv.splice(2).join(' ');

console.log('create-react-app magic: this will take a couple of minutes so relax');
execSync(`yarn create react-app ${arguments}`)
console.log(`
    The wait is finally over, please:

    cd ${argument[0]}
    yarn start

`)