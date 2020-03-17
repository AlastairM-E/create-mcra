const path = require('path');
const fs = require('fs');

function imp(arguments) {
    //First of all --> create a imp.txt.
    // take the arguments supplied to the function 
    //wite it to the imp.txt file.
    //create a flag if it is the cli or package to be installed. (-cli | default to an aditional package).
    //make a switch case.
    //check if file is imp.json exist, if so, take the content for evalution, if not create a new json file.
    //write the object { "cli" : "xyz"}; to the imp.json.
    //write the object { "cli" : "xyz", "imp" : ["a", "b", "c"]}
    
    const [command, flag, ...nameOfPackages] = arguments;
    const mcraUserPreferences = path.join(__dirname, `../node_modules/mcra-user-preferences`);
    const impJson = `${mcraUserPreferences}/imp.json`;

    if (fs.existsSync(mcraUserPreferences) === false) {
        fs.mkdirSync(mcraUserPreferences);
    };

    if (fs.existsSync(impJson) === false) {
        fs.writeFileSync(impJson, '{ "cli" : "", "packages" : [] }');
    };
    
    const impJsonContent = fs.existsSync(impJson) ? fs.readFileSync(impJson, 'utf8') : null;
    const { cli, packages } = JSON.parse(impJsonContent);

    
    //what makes sense:
    //- is to have a single 

    switch (flag) {
        case '-cli': 
            const newCli = { cli : nameOfPackages[0] };
            const newJsonCli = JSON.stringify({ ...newCli, packages });
            fs.writeFileSync(impJson, newJsonCli);
            break;
    
        default:
            nameOfPackages.push(flag);
            const packageSet = new Set([...nameOfPackages, ...packages]);
            const newPackages = { packages : [...packageSet] };
            const newJsonPackages = JSON.stringify({ cli, ...newPackages });
            fs.writeFileSync(impJson, newJsonPackages);
            break;
    }
};

  


    //fs.writeFileSync(`${mcraUserPreferences}/imp.json`);

module.exports = imp;