#!/usr/bin/env node
/* IMPORTS */
const process = require('process');
const fs = require('fs');
const homedir = require('os').homedir();

console.log('process :', process.env);

const { 
    initialIndexJsFile, 
    reactFunctionalTemplateFile, 
    jestTestingTemplateFile, 
    reactClassTemplateFile 
} = require(`./../../../../${homedir}/mcra-user-preferences/user_gen_template.js`) || require('./gen_templates');
const { readSubFilesFrom, appendToFileLines } = require('create-rboil-utils');

function gen(arguments) {
    /* VARIABLES */
    const nameOfModule = arguments[1];
    const flagForComponentType = arguments[2];
    const currentDirectory  = process.cwd();
    const src = readSubFilesFrom(`${currentDirectory}/src`);
    const components = `${currentDirectory}/src/components`;
    const moduleDirectory = `${components}/${nameOfModule}`;

    /* LOGIC */

    //Flag logic
    function templateReactComponent(flag, moduleName) {
        switch (flag) {
            case '-c':
                return reactClassTemplateFile(moduleName);
                break;
        
            default:
                return reactFunctionalTemplateFile(moduleName);
                break;
        };
    } ;

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
    fs.writeFileSync(
        `${moduleDirectory}/${nameOfModule}.jsx`, 
        templateReactComponent(flagForComponentType, nameOfModule)
    );
    fs.writeFileSync(
        `${moduleDirectory}/${nameOfModule}.test.jsx`, 
        jestTestingTemplateFile(nameOfModule)
    );

    //Adding index.js
    const componentsDirFiles = readSubFilesFrom(components);
    const numberOfModules = componentsDirFiles.length - 1;
    const hasIndexJsFileBeenAdded = componentsDirFiles.filter(file => file === 'index.js');

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
};

module.exports = gen;