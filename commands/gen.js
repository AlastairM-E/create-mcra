#!/usr/bin/env node
const { readSubFilesFrom } = require('create-rboil-utils');
const process = require('process');
const fs = require('fs');

const currentDirectory  = process.cwd();
const componentsDirectory = `${currentDirectory}/src/components`

function gen(arguments) {
    const nameOfModule = arguments[1];
    const srcDirectory = readSubFilesFrom(`${currentDirectory}/src`);
    const initialIndexJsFile = `
        import ${nameOfModule} from '${nameOfModule}/${nameOfModule}.jsx';
        
        export default {
            ${nameOfModule},
        };
    `;
    
    if (srcDirectory.length === 0) {
        fs.mkdirSync(componentsDirectory);
    };

    srcDirectory.forEach(file => {
        const folder = 'object';
        if (typeof(file) === folder && file.directory !== 'components') {
            fs.mkdirSync(componentsDirectory)
        };
    });

    const componentsDirFiles = readSubFilesFrom(componentsDirectory);

    if (componentsDirFiles.length === 0) {
        fs.writeFileSync(`${componentsDirectory}/index.js`, initialIndexJsFile);
    };

    componentsDirFiles.forEach(file => {
        const folder = 'object';
        if (typeof(file) === folder && file.directory !== 'components') {
            fs.mkdirSync(`${componentsDirectory}/index.js`)
        };
    });
    
    
    //add a formula of xyz.

    //then create a directory of th nameof module.
    //create a <nameOfModule>.jsx file.
    //create a <nameOfModule>.test.jsx file.

    //input the relevatn contence fpr those files.
};

module.exports = gen;