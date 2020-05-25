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
  const [, flag, ...newUnsanitizedPackages] = args;
  const mcraUserPreferences = path.join(__dirname, '../mcra-user-preferences');
  const impJson = path.join(mcraUserPreferences, 'imp.json');

  if (fs.existsSync(mcraUserPreferences) === false) {
    fs.mkdirSync(mcraUserPreferences);
  }

  if (fs.existsSync(impJson) === false) {
    fs.writeFileSync(impJson, '{ "cli" : "", "packages" : [] }');
  }

  const { cli, packages } = impJsonContent(impJson);
  const userInputedPackages = newUnsanitizedPackages.map(sanitizeItem);
  const oldSanitizedPackages = packages.map(sanitizeItem);

  function addNewCliToImpJson() {
    const newJsonCli = JSON.stringify({
      cli: userInputedPackages[0],
      packages: oldSanitizedPackages,
    });
    fs.writeFileSync(impJson, newJsonCli);
  }

  function removePackagesFromImpJson() {
    // if remove Node Package is success, it will true, which will not be equal to undefined.
    // Becuase it is not equal to undefined, it will return false and the item
    // in the oldSanitizedPackages wll be deleted.w
    // from the namesOfPackages, show the items whcih will be deleted.
    // However, if it return nothing, undefined from the array.find function,
    // then the removeNodePackage will return true. Thus , the apckage will not be remove.
    // Then all the oldSanitizedPackages are iterated untill the new list of packages
    // for the imp.json has been filtered out.
    const packageUnfounded: undefined = undefined;
    const removeNodePackage = (nodePackage: string) => userInputedPackages.find((item: string) => {
      function successfullyFoundNodePackageToRemove(): boolean {
        console.log(`removed ${nodePackage}`);
        return true;
      }
      return item === nodePackage ? successfullyFoundNodePackageToRemove() : false;
    }) === packageUnfounded;
    const filterPackages = oldSanitizedPackages.filter(removeNodePackage);
    const filterJsonPackages = JSON.stringify({ cli, packages: filterPackages });
    fs.writeFileSync(impJson, filterJsonPackages);
  }

  function addNewPackagesToImpJson() {
    userInputedPackages.push(String(flag));

    const packageSet = new Set([...userInputedPackages, ...oldSanitizedPackages]);
    const newJsonPackages = JSON.stringify({ cli, packages: [...packageSet] });

    fs.writeFileSync(impJson, newJsonPackages);

    console.log(`added ${userInputedPackages.join(' ')}`);
  }

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
