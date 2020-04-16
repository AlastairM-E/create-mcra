export {};

const path = require('path');
const fs = require('fs');

function imp(args: string[]) {
  // First of all --> create a imp.txt.
  // take the args supplied to the function
  // wite it to the imp.txt file.
  // create a flag if it is the cli or package to be installed. (-cli | default to an aditional package).
  // make a switch case.
  // check if file is imp.json exist, if so, take the content for evalution, if not create a new json file.
  // write the object { "cli" : "xyz"}; to the imp.json.
  // write the object { "cli" : "xyz", "imp" : ["a", "b", "c"]}

  const [command, flag, ...nameOfPackages] = args;
  const mcraUserPreferences = path.join(__dirname, '../node_modules/mcra-user-preferences');
  const impJson = `${mcraUserPreferences}/imp.json`;

  const mcra_User_Preferences_Exists = fs.existsSync(mcraUserPreferences) === false;
  const imp_Json_File_Exists = fs.existsSync(impJson) === false;

  if (mcra_User_Preferences_Exists) {
    fs.mkdirSync(mcraUserPreferences);
  }

  if (imp_Json_File_Exists) {
    fs.writeFileSync(impJson, '{ "cli" : "", "packages" : [] }');
  }

  const impJsonContent = fs.existsSync(impJson) ? fs.readFileSync(impJson, 'utf8') : null;
  const { cli, packages } = JSON.parse(impJsonContent);

  // what makes sense:
  // - is to have a single

  switch (flag) {
    case '-cli':
      const newCli = { cli: nameOfPackages[0] };
      const newJsonCli = JSON.stringify({ ...newCli, packages });
      fs.writeFileSync(impJson, newJsonCli);
      break;

    case '-rm':
      const filterPackages = packages.filter((nodePackage: string) => nameOfPackages.find((item) => {
        if (item === nodePackage) {
          console.log(`removed ${nodePackage}`);
          return true;
        }
        return false;
      }) === undefined);
      const filterJsonPackages = JSON.stringify({ cli, packages: filterPackages });
      fs.writeFileSync(impJson, filterJsonPackages);
      break;

    default:
      nameOfPackages.push(flag);

      const packageSet = new Set([...nameOfPackages, ...packages]);
      const newPackages = { packages: [...packageSet] };
      const newJsonPackages = JSON.stringify({ cli, ...newPackages });

      fs.writeFileSync(impJson, newJsonPackages);

      console.log(`added ${nameOfPackages.join(' ')}`);
      break;
  }
}

module.exports = imp;
