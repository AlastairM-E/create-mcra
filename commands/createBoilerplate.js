const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createBoilerplate(arguments) {

    const impJson = path.join(__dirname, `../node_modules/mcra-user-preferences/imp.json`);
    let cli = 'create-react-app';
    let additionalPackages = null;
    
    if (fs.existsSync(impJson)){
        const impJsonComponent = JSON.parse(fs.readFileSync(impJson, 'utf8'));

        cli = impJsonComponent.cli;
        additionalPackages = impJsonComponent.packages;
    };

    exec('yarn --version', (err) => {
        let packageManager = err ? 'yarn' : 'npm';

        console.log(`${cli} magic: this will take a couple of minutes so relax.`);

        switch (packageManager) {
            case 'yarn':
                cli = `${packageManager} ${cli.split('').map((item, index) => index === 6 ? ' ' : item).join('')}`;
                break;
        
            default:
                cli = `npx ${cli}`;
                break;
        };

        execSync(`${cli} ${arguments}`);

        const devInstallation = packageManager === 'yarn' ? 'add --dev' : 'install --save-dev';

        additionalPackages ? execSync(`${packageManager} ${devInstallation} ${additionalPackages.join(' ')}`) : null;

        console.log(`
            The wait is finally over, please:

            cd ${arguments.split(' ')[0]}
            ${packageManager} start
        `);

    });

    //SHould I use inquirer for th e automatic cli or something different.
    //problemable use auto yarn since I am mainly the only person who will be using this tool
    

    
};

module.exports = createBoilerplate;