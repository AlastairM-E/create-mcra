const { execSync } = require('child_process');

function createBoilerplate(arguments) {
    console.log('create-react-app magic: this will take a couple of minutes so relax.');
    execSync(`npx create-react-app ${arguments}`);
    console.log(`
        The wait is finally over, please:

        cd ${arguments[0]}
        npm/yarn start
    `);
};

module.exports = createBoilerplate;