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
  initialIndexJsFile,
  reactFunctionalTemplateFile,
  jestTestingTemplateFile,
  reactClassTemplateFile,
} = dynamicTemplateRequire();
const { readSubFilesFrom, appendToFilesLines } = require('create-rboil-utils');

function gen(args: string): void {
  /* VARIABLES */
  const nameOfModule = args[1];
  const flagForComponentType = args[2];
  const currentDirectory = process.cwd();
  const src = readSubFilesFrom(`${currentDirectory}/src`);
  const components = `${currentDirectory}/src/components`;
  const moduleDirectory = `${components}/${nameOfModule}`;

  /* LOGIC */

  // Flag logic
  function templateReactComponent(flag: string, moduleName: string) {
    switch (flag) {
      case '-c':
        return reactClassTemplateFile(moduleName);
        break;

      default:
        return reactFunctionalTemplateFile(moduleName);
        break;
    }
  }

  // Adding components dir
  const hasComponentFolderBeenAdded = src.filter((file: { directory : string }) => {
    const folder = 'object';
    if (typeof (file) === folder) {
      return true;
    }
    return false;
  });

  if (hasComponentFolderBeenAdded.length === 0) {
    fs.mkdirSync(components);
  }

  // Adding module boilerplate
  fs.mkdirSync(moduleDirectory);
  fs.writeFileSync(
    `${moduleDirectory}/${nameOfModule}.jsx`,
    templateReactComponent(flagForComponentType, nameOfModule),
  );
  fs.writeFileSync(
    `${moduleDirectory}/${nameOfModule}.test.jsx`,
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
  console.log('numerb of Modules', numberOfModules, numberOfModules + 3);
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
