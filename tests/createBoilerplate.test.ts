const fs = require('fs');
const faker = require('faker');
const { newCli, packagesToBeInstalled } = require('../build/createBoilerplate/index.js');

beforeAll(() => {
  // Check the imp.json file is there and remove the imp.json file.
  // Check the mcra-user-preferences dir is there and remove the mcra-user-preferences dir.
  if (fs.existsSync('./build/adapt/mcra-user-preferences/imp.json')) {
    fs.unlinkSync('./build/adapt/mcra-user-preferences/imp.json');
  }
  if (fs.existsSync('./build/adapt/mcra-user-preferences')) {
    fs.rmdirSync('./build/adapt/mcra-user-preferences');
  }
});

afterEach(() => {
  // Check the imp.json file is there and remove the imp.json file.
  // Check the mcra-user-preferences dir is there and remove the mcra-user-preferences dir.
  if (fs.existsSync('./build/adapt/mcra-user-preferences/imp.json')) {
    fs.unlinkSync('./build/adapt/mcra-user-preferences/imp.json');
  }
  if (fs.existsSync('./build/adapt/mcra-user-preferences')) {
    fs.rmdirSync('./build/adapt/mcra-user-preferences');
  }
});

test('The newCli will return the apprioprate response if the package manager is npm, yarn or not a package manager at all', () => {
  /* NEWCLI */
  // The test will return the apprioprate command for npm & yarn packages
  // that will be run as part of creating the boilerplate for mcra.
  // Create a variable for a fake package name by using faker to generate a random word.
  // Create another variable with the word 'create-' appended to the fake package name.
  // Call the newCli function placing the arguments of 'yarn' & the fakeBoilerplate.
  // Expect it to return `yarn create ${fakePackageName}`,
  // which is the command to execute boilerplate creators for yarn package manager.
  // Test that newCli('npm', fakeBoilerplateCli) will return `npx ${fakeBoilerplateCli}`.
  // This is the command which executes the package on download for npm,
  // therefore used for boilerplate clis.
  // Then test that a fakePackageManger (using the faker fake word generator again)
  // will return a fat error as no other package manager is currently being used enough
  // to be handled by this package.
  const fakePackageName = faker.lorem.word();
  const fakeBoilerplateCli = `create-${fakePackageName}`;

  const newYarnCli = newCli('yarn', fakeBoilerplateCli);
  expect(newYarnCli).toStrictEqual(`yarn create ${fakePackageName}`);

  const newNpmCli = newCli('npm', fakeBoilerplateCli);
  expect(newNpmCli).toStrictEqual(`npx ${fakeBoilerplateCli}`);

  const fakePackageManager = faker.lorem.word();
  expect(() => newCli(fakePackageManager, fakeBoilerplateCli)).toThrowError();
});

test('packagesToBeInstalled returns the additional packages or cli if the imp.json has been implemented to do so', () => {
  /* packagesToBeInstalled TEST */
  // =* Should return create-react-app and null if it has been cold called.
  // ^=* BeforeEach to check that their is no imp.json and mcra-user-preferences.
  // ^=* AfterEach to just to clean up the imp.json as well.
  // ^=* const [boilerplateCli, additionalPackages] = packagesToBeInstalled();
  // ^=* boilerplateCli should be equal to create-react-app.
  // ^=* additionalPackages should be equal to null.
  // =* If one has done the imp for a cli and a boilerplate, check that those has returned the changes to.
  // ^=* Faker lorem word for boilerplateCli.
  // ^=* Faker.lorem.word for additional package.
  // ^=* execSync(`mcra imp -cli ${boilerplateCli}`).
  // ^=* execSync(`mcra imp ${additionalPackages} aRandomFakerPackage`).
  // ^=* should have boilerCli which is equal to the fakerBoielrplate Cli.
  // ^=* should ahve additional packages equal to [additonalPackage, 'aRandomFakerPackage'].
  const [defaultCli, defaultAdditionalPackages] = packagesToBeInstalled();
  expect(defaultCli).toStrictEqual('create-react-app');
  expect(defaultAdditionalPackages).toStrictEqual(null);

  // const fakeBoilerplateCli = faker.lorem.word();
  // const fakePackageName = faker.lorem.word();

  // execSync(`mcra imp -cli ${fakeBoilerplateCli}`);
  // execSync(`mcra imp ${fakePackageName} aRandomFakerPackage`);

  // expect()
});
