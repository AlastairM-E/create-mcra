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
  const mcraUserPreferences = path.join(__dirname, 'mcra-user-preferences');
  const mcraUserGenTemplateTs = `${mcraUserPreferences}/user_gen_templates.ts`;
  const userGenTemplatesAlreadyExists = fs.existsSync(mcraUserGenTemplateTs);

  /* LOGIC */
  if (fs.existsSync(mcraUserPreferences) === false) {
    fs.mkdirSync(mcraUserPreferences);
  }

  function pathToCopyTemplates() {
    if (userGenTemplatesAlreadyExists) {
      return mcraUserGenTemplateTs;
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
    const filePaths = { userGenTemplatesAlreadyExists, mcraUserGenTemplateTs };
    handleResponseTo(answer, filePaths);
  });

  return null;
}

/* EXPORTS */
module.exports = adapt;
