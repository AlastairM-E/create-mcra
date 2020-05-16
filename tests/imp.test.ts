/* IMPORTS */
const { execSync } = require('child_process');
const fs = require('fs');
const faker = require('faker');
const { initialImpJsonfile } = require('./fixtures/imp/index.ts');
const { packagesToBeInstalled } = require('../build/createBoilerplate/index');

/* CLEAN UP */
beforeEach(() => {
  // Check the imp.json file is there and remove the imp.json file.
  // Check the mcra-user-preferences dir is there and remove the mcra-user-preferences dir.
  const doesImpJsonExist = () => fs.existsSync('./build/adapt/mcra-user-preferences/imp.json');
  const doesMcraUserPreferencesDirExist = () => fs.existsSync('./build/adapt/mcra-user-preferences');

  if (doesImpJsonExist()) {
    fs.unlinkSync('./build/adapt/mcra-user-preferences/imp.json');
  }
  if (doesMcraUserPreferencesDirExist()) {
    fs.rmdirSync('./build/adapt/mcra-user-preferences');
  }

  // console.log('imp', 'before', {
  //   doesImpJsonExist: doesImpJsonExist(),
  //   doesMcraUserPreferencesDirExist: doesMcraUserPreferencesDirExist(),
  // });
});

afterEach(() => {
  // Check & Remove the imp.json file.
  // Check & Remove the mcra-user-preferences dir.
  const doesImpJsonExist = () => fs.existsSync('./build/adapt/mcra-user-preferences/imp.json');
  const doesMcraUserPreferencesDirExist = () => fs.existsSync('./build/adapt/mcra-user-preferences');

  if (doesImpJsonExist()) {
    fs.unlinkSync('./build/adapt/mcra-user-preferences/imp.json');
  }
  if (doesMcraUserPreferencesDirExist()) {
    fs.rmdirSync('./build/adapt/mcra-user-preferences');
  }

  // console.log('imp', 'after', {
  //   doesImpJsonExist: doesImpJsonExist(),
  //   doesMcraUserPreferencesDirExist: doesMcraUserPreferencesDirExist(),
  // });
});

/* TESTS */
test('An empty mcra imp command should create the initial mcra-user-preferences folder and imp.json', () => {
  // Checking that at first the mcra-user-prefernce dir and imp.json file does not exist at first.
  // Run an empty mcra imp command.
  // Check that the imp.json file and mcra-user-prefernce dir now do exist.
  // Check that the fixture content and imp.json content are the same.

  const doesMcraUserPreferencesDirExist = () => fs.existsSync('./build/adapt/mcra-user-preferences');
  const doesImpJsonExist = () => fs.existsSync('./build/adapt/mcra-user-preferences/imp.json');

  expect(doesMcraUserPreferencesDirExist()).toBe(false);
  expect(doesImpJsonExist()).toBe(false);

  execSync('mcra imp ');

  expect(doesMcraUserPreferencesDirExist()).toBe(true);
  expect(doesImpJsonExist()).toBe(true);

  const impJsonContent = fs.readFileSync('./build/adapt/mcra-user-preferences/imp.json', 'utf8');
  expect(impJsonContent).toStrictEqual(initialImpJsonfile);
});

test('the mcra imp command can add and remove package names stored in the imp.json', () => {
  // ADDING PACKAGES
  // Create the appriopriate fixtures a text export.
  // Make a fake package name which has no spaces in the package name
  // (this is done by using the faker.lorem.word() to get just a single word).
  // Run mcra imp (package-name).
  // Check the imp.json is equal to the intital imp.json file content.
  // Check that mcra imp.json contains the same text.
  // Input multiple packages more (banana, apple and pineapple).
  // Make a fixture out of those pacakges.
  // Check that the expected value returns the 3 packages recently added and the fakePackageName.

  const fakePackageName = faker.lorem.word();

  execSync(`mcra imp ${fakePackageName}`);

  const impJsonContent = () => fs.readFileSync('./build/adapt/mcra-user-preferences/imp.json', 'utf8');
  const newImpJsonFixture = `{"cli":"","packages":["${fakePackageName}"]}`;

  expect(impJsonContent()).toStrictEqual(newImpJsonFixture);

  execSync('mcra imp apple banana pineapple');

  const multiplePackageImpJsonFixture = `{"cli":"","packages":["banana","pineapple","apple","${fakePackageName}"]}`;
  expect(impJsonContent()).toStrictEqual(multiplePackageImpJsonFixture);

  // REMOVING PACKAGES
  // This will be done by runing the execSync('mcra imp -rm (fakePackageName)').
  // Then check that the removal worked by looking creating a fixture.
  // Then check that the imp.json contentis equal to the fixture.
  // Check that the removal feature can work for multiple packages by:
  // Exec the command mcra imp -rm apple banana pineapple.
  // Check that the removal worked by expecting the impJsonContent
  // is equal to a clearImpJsonFixture.

  execSync(`mcra imp -rm ${fakePackageName}`);
  const fakePackageRemovedFromImpJsonFixture = '{"cli":"","packages":["banana","pineapple","apple"]}';

  expect(impJsonContent()).toStrictEqual(fakePackageRemovedFromImpJsonFixture);

  execSync('mcra imp -rm apple banana pineapple');

  const clearImpJsonFixture = '{"cli":"","packages":[]}';
  expect(impJsonContent()).toStrictEqual(clearImpJsonFixture);
});

test('the imp -cli flag works to add a single cli inside the imp.json file', () => {
  // The cli flag should only add one main cli.
  // Therefore, I need to execSync an mcra command which has a cli of create-rboil.
  // Then I need to check that only that command has been returned.
  // Exec adding in a few new packages.
  // Check the imp.json file changes in the expected way.
  // Exec a command to implement a new cli : react-boilerplate.
  // Check the imp.json file changes in the expected way.
  // Exec a command to remove packages from the imp.json cli.
  // Check the imp.json file changes in the expected way.
  // Run a command which has multiple clis in the command.
  // Check that this only changes the cli to have one cli in the property
  // and does not have any additional problem.

  const impJsonContent = () => fs.readFileSync('./build/adapt/mcra-user-preferences/imp.json', 'utf8');

  execSync('mcra imp -cli create-rboil');
  expect(impJsonContent()).toStrictEqual('{"cli":"create-rboil","packages":[]}');

  execSync('mcra imp apple banana');
  expect(impJsonContent()).toStrictEqual('{"cli":"create-rboil","packages":["banana","apple"]}');

  execSync('mcra imp -cli react-boilerplate');
  expect(impJsonContent()).toStrictEqual('{"cli":"react-boilerplate","packages":["banana","apple"]}');

  execSync('mcra imp -rm apple');
  expect(impJsonContent()).toStrictEqual('{"cli":"react-boilerplate","packages":["banana"]}');

  execSync('mcra imp -cli create-react-app create-rboil');
  expect(impJsonContent()).toStrictEqual('{"cli":"create-react-app","packages":["banana"]}');
});

test('packagesToBeInstalled returns the additional packages or cli if the imp.json has been implemented to do so', () => {
  /* packagesToBeInstalled */
  // packagesToBeInstalled should return create-react-app and null if it has been called
  // without previous mcra imp commands being run.
  // const [boilerplateCli, additionalPackages] = packagesToBeInstalled();
  // boilerplateCli should be equal to create-react-app.
  // additionalPackages should be equal to null.
  // If run a mcra imp command (cli and packages), the packagesToBeInstalled() should pick up
  // on the changes and the return them.
  // Faker.lorem word for boilerplateCli.
  // Faker.lorem.word for additional package.
  // execSync(`mcra imp -cli ${boilerplateCli}`).
  // execSync(`mcra imp ${additionalPackages} aRandomFakerPackage`).
  // should have boilerCli which is equal to the fakerBoielrplate Cli.
  // should ahve additional packages equal to [additonalPackage, 'aRandomFakerPackage'].

  const [defaultCli, defaultAdditionalPackages] = packagesToBeInstalled();

  expect(defaultCli).toStrictEqual('create-react-app');
  expect(defaultAdditionalPackages).toStrictEqual(null);

  const fakeBoilerplateCli = faker.lorem.word();
  const fakePackageName = faker.lorem.word();

  execSync(`mcra imp -cli ${fakeBoilerplateCli}`);
  execSync(`mcra imp ${fakePackageName} aRandomFakerPackage`);

  const [impCli, impAdditionalPackages] = packagesToBeInstalled();

  const expectedImpCliAndAdditionalPackages = {
    impCli: fakeBoilerplateCli,
    impAdditionalPackages: ['aRandomFakerPackage', fakePackageName],
  };

  expect({ impCli, impAdditionalPackages }).toStrictEqual(expectedImpCliAndAdditionalPackages);
});
