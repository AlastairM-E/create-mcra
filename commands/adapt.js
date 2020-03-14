/* IMPORTS */
const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path');
const process = require('process');

const inquirer = require('inquirer');

/* ADAPT */
function adapt(arguments) {
    /* VARIABLES */
    const mcraUserPreferences =`${homedir}/mcra-user-preferences`;
    const adaptJson = `${mcraUserPreferences}/adapt.json`;
    const mcra_user_gen_templates_js = `${mcraUserPreferences}/user_gen_templates.js`;
    const userGenTemplatesAlreadyExists = fs.existsSync(mcra_user_gen_templates_js);

    /* LOGIC */
        if (fs.existsSync(mcraUserPreferences) === false) {
            fs.mkdirSync(mcraUserPreferences);
            fs.writeFileSync(adaptJson, ``, 'utf8');
        };

        function pathToCopyTemplates() {
            if (userGenTemplatesAlreadyExists) {
                return mcra_user_gen_templates_js;
            } else {
                return path.join(__dirname, `./gen_templates.js`);
            }
            
        };
        
        fs.copyFileSync(
            pathToCopyTemplates(), 
            `${process.cwd()}/user_gen_templates.js`
        );

        const question = { 
            type : 'confirm', 
            name : 'confirmChangesToBoilerplate',
            message: 'Do you to save the changes : '
        };

        inquirer.prompt(question).then(answer => {
            const confirmedChanges = answer.confirmChangesToBoilerplate;
            const newTemplateFileContent = fs.readFileSync(`${process.cwd()}/user_gen_templates.js`, 'utf8');

            if (confirmedChanges) {
                if (userGenTemplatesAlreadyExists) {
                    fs.writeFileSync(
                        mcra_user_gen_templates_js,
                        newTemplateFileContent
                    );
                } else {
                    fs.copyFileSync(
                        `${process.cwd()}/user_gen_templates.js`, 
                        mcra_user_gen_templates_js
                    );
                };
            };

            fs.unlinkSync(`${process.cwd()}/user_gen_templates.js`);
            console.log('preferences have been completed');
        });
};

/* EXPORTS*/
module.exports = adapt;