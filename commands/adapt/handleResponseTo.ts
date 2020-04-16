const fs = require('fs');

interface answer {
    confirmChangesToBoilerplate: boolean;
}

interface filePaths {
    userGenTemplatesAlreadyExists: boolean;
    mcraUserGenTemplateJs: string;
}

function handleResponseTo(
  answer: answer,
  { userGenTemplatesAlreadyExists, mcraUserGenTemplateJs }: filePaths,
): void {
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
}

module.exports = { handleResponseTo };
