#!/usr/bin/env node
/* IMPORTS */
const process = require('process');
const fs = require('fs');
const { readSubFilesFrom, appendToFileLines } = require('create-rboil-utils');

function gen(arguments) {
    /* VARIABLES */
    const nameOfModule = arguments[1];
    const currentDirectory  = process.cwd();
    const srcDirectory = readSubFilesFrom(`${currentDirectory}/src`);
    const components = `${currentDirectory}/src/components`;

const initialIndexJsFile = 
`import ${nameOfModule} from '${nameOfModule}/${nameOfModule}.jsx';
        
export default {
    ${nameOfModule},
};`;

    /* LOGIC */

    //Adding components dir
    const hasComponentFileBeenAdded = srcDirectory.filter(file => {
        const folder = 'object';
        if (typeof(file) === folder && file.directory === 'components') {
            return true;
        };
        return false;
    });

    if (srcDirectory.length === 0 || hasComponentFileBeenAdded.length === 0) {
        fs.mkdirSync(components);
    };

    //Adding index.js
    const componentsDirFiles = readSubFilesFrom(components);
    if (componentsDirFiles.length === 0) {
        fs.writeFileSync(`${components}/index.js`, initialIndexJsFile);
    };
    
    
    //add a formula of xyz.

    //then create a directory of th nameof module.
    //create a <nameOfModule>.jsx file.
    //create a <nameOfModule>.test.jsx file.

    //input the relevatn contence fpr those files.
};

module.exports = gen;