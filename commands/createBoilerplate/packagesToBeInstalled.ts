export {};

const fs = require('fs');
const path = require('path');

const pathToMcraUserPrefencesDir = path.join(__dirname, '../../mcra-user-preferences');
const pathToImpJson = path.join(pathToMcraUserPrefencesDir, 'imp.json');

function packagesToBeInstalled(): [string, void | string[]] {
  console.log({ pathToMcraUserPrefencesDir });
  const impJsonExists = () => fs.existsSync(pathToImpJson);
  const defaultBoilerplate: string = 'create-react-app';
  const noAdditionalPackages: void = null;

  if (impJsonExists()) {
    const { cli, packages } = JSON.parse(
      fs.readFileSync(pathToImpJson, 'utf8'),
    );
    return [cli, packages];
  }
  return [defaultBoilerplate, noAdditionalPackages];
}

module.exports = {
  packagesToBeInstalled,
};
