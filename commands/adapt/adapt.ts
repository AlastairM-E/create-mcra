/* IMPORTS */
export {};

const fs = require('fs');
const path = require('path');
const process = require('process');

const inquirer = require('inquirer');
const { handleResponseTo } = require('./handleResponseTo');

/* INTERFACES */
interface cliResponse {
  confirmChangesToBoilerplate: boolean;
}

/* ADAPT */
function adapt(): void {
  /* VARIABLES */
  const mcraUserPreferences = path.join(process.cwd(), 'mcra-user-preferences');
  const mcraUserGenTemplatePath = `${mcraUserPreferences}/user_gen_templates.ts`;
  const userGenTemplatesAlreadyExists = fs.existsSync(mcraUserGenTemplatePath);

  /* LOGIC */
  if (fs.existsSync(mcraUserPreferences) === false) {
    fs.mkdirSync(mcraUserPreferences);
  }

  function pathToCopyTemplates() {
    if (userGenTemplatesAlreadyExists) {
      return mcraUserGenTemplatePath;
    }
    return path.join(__dirname, '../../commands/gen_templates.ts');
  }
  fs.copyFileSync(
    pathToCopyTemplates(),
    `${process.cwd()}/user_gen_templates.ts`,
  );

  const question = {
    type: 'confirm',
    name: 'confirmChangesToBoilerplate',
    message: 'Do you to save the changes : ',
  };


  inquirer.prompt(question).then((answer: cliResponse) => {
    const filePaths = { userGenTemplatesAlreadyExists, mcraUserGenTemplatePath };
    handleResponseTo(answer, filePaths);
  });

  return null;
}

/* EXPORTS */
module.exports = adapt;
