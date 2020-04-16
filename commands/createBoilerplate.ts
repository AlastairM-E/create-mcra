export {};

const { exec, execSync } = require('child_process');
const process = require('process');
const fs = require('fs');
const path = require('path');

function createBoilerplate(args: string) {
  // impJson : path to imp.json in nodemodules.
  // cli : default --> create-ract-app
  // additional packages --> null by default to act as a check later on.

  const impJson = path.join(__dirname, '../node_modules/mcra-user-preferences/imp.json');
  let cli = 'create-react-app';
  let additionalPackages: void | string[] = null;

  // check if impJson file exists in the node modules folder, read the file and plase it via json
  // if make the cli be equal to the content of the imp json value --> have ht ecli be equal to the cli.
  // have th addiotnal packages be equal to the packages.

  if (fs.existsSync(impJson)) {
    const impJsonValue = JSON.parse(fs.readFileSync(impJson, 'utf8'));

    cli = impJsonValue.cli;
    additionalPackages = impJsonValue.packages;
  }

  // Exec the yarn --version command to check if their is an error.
  // if err is false, use yarn, else npm. --> defaults via npx.
  // log a message to show which cli is being executed.


  exec('yarn --version', (err: void) => {
    const packageManager = err !== null ? 'npm' : 'yarn';

    console.log(`${cli} magic: this will take a couple of minutes so relax.`);

    // check via the package manager -->
    // if yarn package + spilt the cli by nothing, remove the - at the 7th index item and join by nothing, to create : create <PackageName>
    // if npm --> cli is equal to npx <cli>

    switch (packageManager) {
      case 'yarn':
        cli = `${packageManager} ${cli.split('').map((item, index) => (index === 6 ? ' ' : item)).join('')}`;
        break;

      case 'npm':
        cli = `npx ${cli}`;
        break;
    }

    // execute the cli stuff with any arguments supplied for the folder and stuff.
    // dev isntallition will be if the package Manager is yarn return 'add -dev' else (if npm) 'install --save-dev'.
    // The log out a message and installl the additonal packages if the additionaplkaces is falsely (null).


    execSync(`${cli} ${args}`);

    const devInstallation = packageManager === 'yarn' ? 'add ' : 'install';

    console.log('Any additional packages from mcra imp are being installed');
    console.log(`${packageManager} ${devInstallation} ${additionalPackages}`);
    if (additionalPackages) {
      execSync(
        `${packageManager} ${devInstallation} ${additionalPackages.join(' ')}`,
        { cwd: `${process.cwd()}/${args}` },
      );
    }

    // log out when the package is read with the appriopate file name and cd to the packageManger value.
    console.log(`
            The wait is finally over, please:

            cd ${args.split(' ')[0]}
            ${packageManager} start
        `);
  });
}

module.exports = createBoilerplate;
