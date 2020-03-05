#!/usr/bin/env node
const { execSync } = require('child_process');
const { argv } = require('process');

const arguments = argv.splice(2).join(' ');

console.log('create-react-app magic: this will take a couple of minutes so relax');
<<<<<<< HEAD
execSync(`yarn create react-app ${arguments}`)
=======

execSync(`npx create-react-app ${arguments}`);

>>>>>>> mcv0.0.1
console.log(`
    The wait is finally over, please:

    cd ${argument[0]}
<<<<<<< HEAD
    yarn start

`)
=======
    npm/yarn start
`);
>>>>>>> mcv0.0.1
