const fs = require('fs');

interface answer {
    confirmChangesToBoilerplate: boolean;
}

interface filePaths {
    mcraUserGenTemplatePath: string;
}

function handleResponseTo(answer: answer, { mcraUserGenTemplatePath }: filePaths): void {
  const confirmedChanges = answer.confirmChangesToBoilerplate;
  const newTemplateFileContent = fs.readFileSync(`${process.cwd()}/user_gen_templates.ts`, 'utf8');

  if (confirmedChanges) {
    fs.writeFileSync(mcraUserGenTemplatePath, newTemplateFileContent);
  }

  fs.unlinkSync(`${process.cwd()}/user_gen_templates.ts`);
  console.log('preferences have been completed');
}

module.exports = { handleResponseTo };
