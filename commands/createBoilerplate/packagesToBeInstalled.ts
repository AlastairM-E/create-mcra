export {};

const fs = require('fs');
const path = require('path');

function packagesToBeInstalled(): [string, void | string[]] {
  const impJson = path.join(__dirname, '../node_modules/mcra-user-preferences/imp.json');
  const defaultBoilerplate: string = 'create-react-app';
  const noAdditionalPackages: void = null;

  if (fs.existsSync(impJson)) {
    const { cli, packages } = JSON.parse(fs.readFileSync(impJson, 'utf8'));
    return [cli, packages];
  }
  return [defaultBoilerplate, noAdditionalPackages];
}

module.exports = {
  packagesToBeInstalled,
};
