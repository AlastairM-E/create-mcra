#!/usr/bin/env node
/* IMPORTS */
const process = require('process');
const fs = require('fs');

const { initialIndexJsFile, reactTemplateFile, jestTestingTemplateFile } = require('./gen_templates');
const { readSubFilesFrom, appendToFileLines } = require('create-rboil-utils');

function gen(arguments) {
    /* VARIABLES */
    const nameOfModule = arguments[1];
    const currentDirectory  = process.cwd();
    const src = readSubFilesFrom(`${currentDirectory}/src`);
    const components = `${currentDirectory}/src/components`;
    const moduleDirectory = `${components}/${nameOfModule}`;

    /* LOGIC */

    //Adding components dir
    const hasComponentFolderBeenAdded = src.filter(file => {
        const folder = 'object';
        if (typeof(file) === folder && file.directory === 'components') {
            return true;
        };
        return false;
    });

    if (hasComponentFolderBeenAdded.length === 0) {
        fs.mkdirSync(components);
    };

    //Adding module boilerplate
    fs.mkdirSync(moduleDirectory);
    fs.writeFileSync(`${moduleDirectory}/${nameOfModule}.jsx`, reactTemplateFile(nameOfModule));
    fs.writeFileSync(`${moduleDirectory}/${nameOfModule}.test.jsx`, jestTestingTemplateFile(nameOfModule));

    //Adding index.js
    const componentsDirFiles = readSubFilesFrom(components);
    const numberOfModules = componentsDirFiles.length - 1;
    const hasIndexJsFileBeenAdded = componentsDirFiles.filter(file => file === 'index.js');

    console.log(hasIndexJsFileBeenAdded);

    if (hasIndexJsFileBeenAdded.length === 0) {
        fs.writeFileSync(`${components}/index.js`, initialIndexJsFile(nameOfModule));
        return null;
    } else {
        console.log('numerb of ModulesL', numberOfModules, numberOfModules + 3);
        appendToFileLines(
            `${components}/index.js`, 
            `import ${nameOfModule} from './${nameOfModule}/${nameOfModule}.jsx';\n`,
            [numberOfModules, numberOfModules],
            false
        );

        appendToFileLines(
            `${components}/index.js`, 
            `\t${nameOfModule},`,
            [numberOfModules + 5, numberOfModules + 5],
            true
        );
    };

    
    
    //add a formula of xyz.
    //appendTotheFile the new module line which doesn't replace, with will be the [numberOfModules, numberofModules + 1];
    //appendToTheFile the new module line at [numberOfModules + 3, numberofModules + 4]

    //then create a directory of th nameof module.
    //create a <nameOfModule>.jsx file.
    //create a <nameOfModule>.test.jsx file.

    //input the relevatn contence fpr those files.
};

module.exports = gen;