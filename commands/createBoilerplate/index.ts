const { newCli } = require('./newCli');
const { packagesToBeInstalled } = require('./packagesToBeInstalled');
const { tryToInstallAdditionalPackages } = require('./tryToInstallAdditionalPackages');

module.exports = {
  newCli,
  packagesToBeInstalled,
  tryToInstallAdditionalPackages,
};
