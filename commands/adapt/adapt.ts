/* IMPORTS */
export {};

const fs = require('fs');
const path = require('path');
const process = require('process');

const inquirer = require('inquirer');
const { handleResponseTo } = require('./handleResponseTo');

/* ADAPT */
function adapt(): void {
  /* VARIABLES */
  const mcraUserPreferences = path.join(__dirname, 'mcra-user-preferences');
  const mcraUserGenTemplateJs = `${mcraUserPreferences}/user_gen_templates.js`;
  const userGenTemplatesAlreadyExists = fs.existsSync(mcraUserGenTemplateJs);

  /* LOGIC */
  if (fs.existsSync(mcraUserPreferences) === false) {
    fs.mkdirSync(mcraUserPreferences);
  }

  function pathToCopyTemplates() {
    if (userGenTemplatesAlreadyExists) {
      return mcraUserGenTemplateJs;
    }
    return path.join(__dirname, '../../commands/gen_templates.ts');
  }
  console.log({ mcraUserGenTemplateJs, pathToCopyTemplates: pathToCopyTemplates() });
  fs.copyFileSync(
    pathToCopyTemplates(),
    `${process.cwd()}/user_gen_templates.ts`,
  );

  const question = {
    type: 'confirm',
    name: 'confirmChangesToBoilerplate',
    message: 'Do you to save the changes : ',
  };

  inquirer.prompt(question).then((answer: { confirmChangesToBoilerplate: boolean }) => {
    const filePaths = { userGenTemplatesAlreadyExists, mcraUserGenTemplateJs };
    handleResponseTo(answer, filePaths);
  });

  return null;
}

/* EXPORTS */
module.exports = adapt;
