const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function createBoilerplate(arguments) {

    const impJson = path.join(__dirname, `../node_modules/mcra-user-preferences/imp.json`);
    let cli = 'create-react-app';
    let additionalPackages = null;

    if (fs.existsSync(impJson)){
        const impJsonComponent = JSON.parse(fs.readSync(impJson));
        cli = impJsonComponent.cli;
        additionalPackages = impJsonComponent.packages;
    };

    

    console.log(`${cli} magic: this will take a couple of minutes so relax.`);
    execSync(`npx ${cli} ${arguments}`);
    additionalPackages ? execSync(`yarn install --dev ${additionalPackages}`) : null;
    console.log(`
        The wait is finally over, please:

        cd ${arguments.split(' ')[0]}
        npm/yarn start
    `);
};

module.exports = createBoilerplate;