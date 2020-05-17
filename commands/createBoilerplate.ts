export {};

const { execSync } = require('child_process');
const { packagesToBeInstalled, newCli, tryToInstallAdditionalPackages } = require('./createBoilerplate/index');


function createBoilerplate(args: string) {
  const [projectName, ...cliSettings]: string[] = args.split(' ');
  const flag: string = cliSettings.pop();
  const [cli, additionalPackages]: [string, string] = packagesToBeInstalled();

  const packageManager: string = flag === '--yarn' ? 'yarn' : 'npm';
  const boilerplateCli: string = newCli(packageManager, cli);

  console.log(`${cli} magic: this will take a couple of minutes so relax.`);

  execSync(boilerplateCli);

  const installAdditionalPackagesCommand: boolean | string = tryToInstallAdditionalPackages(
    packageManager, additionalPackages,
  );

  if (installAdditionalPackagesCommand) {
    execSync(installAdditionalPackagesCommand);
  }

  console.log(`
            The wait is finally over, please:

            cd ${projectName}
            ${packageManager} start
  `);
}

module.exports = createBoilerplate;
