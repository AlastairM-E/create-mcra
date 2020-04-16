/* IMPORTS */
export {};

const fs = require('fs');
const path = require('path');
const process = require('process');

const inquirer = require('inquirer');

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
    return path.join(__dirname, './../commands/gen_templates.ts');
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

  inquirer.prompt(question).then((answer: { confirmChangesToBoilerplate: boolean }) => {
    const confirmedChanges = answer.confirmChangesToBoilerplate;
    const newTemplateFileContent = fs.readFileSync(`${process.cwd()}/user_gen_templates.js`, 'utf8');

    if (confirmedChanges) {
      if (userGenTemplatesAlreadyExists) {
        fs.writeFileSync(
          mcraUserGenTemplateJs,
          newTemplateFileContent,
        );
      } else {
        fs.copyFileSync(
          `${process.cwd()}/user_gen_templates.js`,
          mcraUserGenTemplateJs,
        );
      }
    }

    fs.unlinkSync(`${process.cwd()}/user_gen_templates.js`);
    console.log('preferences have been completed');
  });

  return null;
}

/* EXPORTS */
module.exports = adapt;
