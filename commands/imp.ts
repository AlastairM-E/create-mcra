export {};

const path = require('path');
const fs = require('fs');

function impJsonContent(impJson: string): { cli: string; packages: string[] } {
  if (fs.existsSync(impJson)) {
    return JSON.parse(fs.readFileSync(impJson, 'utf8'));
  }
  return null;
}

function sanitizeItem(item: any): string {
  return String(item);
}

function imp(args: string[]): void {
  // First of all --> create a imp.txt.
  // take the args supplied to the function
  // wite it to the imp.txt file.
  // create a flag if it is the cli or package to be installed. (-cli | default to
  // an aditional package).
  // make a switch case.
  // check if file is imp.json exist, if so, take the content for evalution,
  // if not create a new json file.
  // write the object { "cli" : "xyz"}; to the imp.json.
  // write the object { "cli" : "xyz", "imp" : ["a", "b", "c"]}

  const [, flag, ...newUnsanitizedPackages] = args;
  const mcraUserPreferences = path.join(__dirname, './adapt/mcra-user-preferences');
  const impJson = `${mcraUserPreferences}/imp.json`;

  if (fs.existsSync(mcraUserPreferences) === false) {
    fs.mkdirSync(mcraUserPreferences);
  }

  if (fs.existsSync(impJson) === false) {
    fs.writeFileSync(impJson, '{ "cli" : "", "packages" : [] }');
  }


  const { cli, packages } = impJsonContent(impJson);
  const nameOfPackages = newUnsanitizedPackages.map(sanitizeItem);
  const oldSanitizedPackages = packages.map(sanitizeItem);

  function addNewCliToImpJson() {
    const newCli = { cli: nameOfPackages[0] };
    const newJsonCli = JSON.stringify({ ...newCli, packages: oldSanitizedPackages });
    fs.writeFileSync(impJson, newJsonCli);
  }

  function removePackagesFromImpJson() {
    const filterPackages = oldSanitizedPackages.filter(
      (nodePackage: string) => nameOfPackages.find((item) => {
        if (item === nodePackage) {
          console.log(`removed ${nodePackage}`);
          return true;
        }
        return false;
      }) === undefined,
    );
    const filterJsonPackages = JSON.stringify({ cli, packages: filterPackages });
    fs.writeFileSync(impJson, filterJsonPackages);
  }

  function addNewPackagesToImpJson() {
    nameOfPackages.push(String(flag));

    console.log({ nameOfPackages, flag }, String(flag));

    const packageSet = new Set([...nameOfPackages, ...oldSanitizedPackages]);
    const newJsonPackages = JSON.stringify({ cli, packages: [...packageSet] });

    fs.writeFileSync(impJson, newJsonPackages);

    console.log(`added ${nameOfPackages.join(' ')}`);
  }

  // what makes sense:
  // - is to have a single

  switch (flag) {
    case '-cli':
      addNewCliToImpJson();
      break;

    case '-rm':
      removePackagesFromImpJson();
      break;

    case '' || null || undefined:
      console.log('You need to add in a package name or flag at the end of the command');
      break;

    default:
      addNewPackagesToImpJson();
      break;
  }

  return null;
}

module.exports = imp;
