export {};

const fs = require('fs');


function packagesToBeInstalled(): [string, void | string[]] {
  const impJsonExists = () => fs.existsSync('./build/adapt/mcra-user-preferences/imp.json');
  const defaultBoilerplate: string = 'create-react-app';
  const noAdditionalPackages: void = null;

  if (impJsonExists()) {
    const { cli, packages } = JSON.parse(fs.readFileSync('./build/adapt/mcra-user-preferences/imp.json', 'utf8'));
    console.log('packagesToBeInstalled', { cli, packages });
    return [cli, packages];
  }
  return [defaultBoilerplate, noAdditionalPackages];
}

module.exports = {
  packagesToBeInstalled,
};
