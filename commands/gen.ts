#!/usr/bin/env node
export {};

/* IMPORTS */
const process = require('process');
const fs = require('fs');

function dynamicTemplateRequire() {
  try {
    return require('mcra-user-preferences/user_gen_templates');
  } catch (e) {
    return require('./gen_templates');
  }
}

const {
  initialIndexJsFile, reactFunctionalTemplateFile, jestTestingTemplateFile, reactClassTemplateFile,
} = dynamicTemplateRequire();
const { readSubFilesFrom, appendToFilesLines } = require('create-rboil-utils');

/* INTERFACES */
interface Dir {
  directory : string
}

/* GEN */
function gen(args: string): void {
  /* VARIABLES */
  const nameOfModule = args[1];
  const flagForComponentType = args[2];
  const currentDir = process.cwd();
  const src = readSubFilesFrom(`${currentDir}/src`);
  const components = `${currentDir}/src/components`;
  const moduleDir = `${components}/${nameOfModule}`;

  /* LOGIC */

  // Flag logic
  function templateReactComponent(flag: string, moduleName: string): string {
    switch (flag) {
      case '-c':
        return reactClassTemplateFile(moduleName);

      default:
        return reactFunctionalTemplateFile(moduleName);
    }
  }

  // Adding components dir
  const hasComponentFolderBeenAdded = src.filter((file: Dir) => file.directory !== undefined);

  if (hasComponentFolderBeenAdded.length === 0) {
    fs.mkdirSync(components);
  }

  // Adding module boilerplate
  fs.mkdirSync(moduleDir);
  fs.writeFileSync(
    `${moduleDir}/${nameOfModule}.jsx`,
    templateReactComponent(flagForComponentType, nameOfModule),
  );
  fs.writeFileSync(
    `${moduleDir}/${nameOfModule}.test.jsx`,
    jestTestingTemplateFile(nameOfModule),
  );

  // Adding index.js
  const componentsDirFiles = readSubFilesFrom(components);
  const numberOfModules = componentsDirFiles.length - 1;
  const hasIndexJsFileBeenAdded = componentsDirFiles.filter((file: string) => file === 'index.js');

  if (hasIndexJsFileBeenAdded.length === 0) {
    fs.writeFileSync(`${components}/index.js`, initialIndexJsFile(nameOfModule));
    return null;
  }
  appendToFilesLines(
    `${components}/index.js`,
    `import ${nameOfModule} from './${nameOfModule}/${nameOfModule}.jsx';\n`,
    [numberOfModules, numberOfModules],
    false,
  );

  appendToFilesLines(
    `${components}/index.js`,
    `\t${nameOfModule},`,
    [numberOfModules + 5, numberOfModules + 5],
    true,
  );
}

module.exports = gen;
