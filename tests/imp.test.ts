/* IMPORTS */
const { execSync } = require('child_process');
const fs = require('fs');
const faker = require('faker');
const imp = require('../build/imp');
const { initialImpJsonfile } = require('./fixtures/imp');

/* CLEAN UP */
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
  // Remove the imp.json file.
  // Remove the mcra-user-preferences dir.
  fs.unlinkSync('./build/adapt/mcra-user-preferences/imp.json');
  fs.rmdirSync('./build/adapt/mcra-user-preferences');
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
  // Create the appriopriate fixtures a text export.
  // Have a certain package name.
  // run mcra imp (package-name).
  // Check the imp.json is equal to the intital imp.json file content.
  // Check that mcra imp.json contains the same text.
  // Input multiple packages more (banana, apple and pineapple).
  // Make a fixture out of those pacakges.
  // check that the expected value returns the 3 packages recently added and the fakePackageName.
  // ^=* This will be done by runing the execSync('mcra imp -rm (fakePackageName)').
  // ^=* Then check that the removal worked by looking creating a fixture.
  // ^=* Then check that the imp.json contentis equal to the fixture.

  // ADDING PACKAGES
  const fakePackageName = faker.hacker.noun();

  execSync(`mcra imp ${fakePackageName}`);

  const impJsonContent = () => fs.readFileSync('./build/adapt/mcra-user-preferences/imp.json', 'utf8');
  const newImpJsonFixture = `{"cli":"","packages":["${fakePackageName}"]}`;

  expect(impJsonContent()).toStrictEqual(newImpJsonFixture);

  execSync('mcra imp apple banana pineapple');

  const multiplePackageImpJsonFixture = `{"cli":"","packages":["banana","pineapple","apple","${fakePackageName}"]}`;
  expect(impJsonContent()).toStrictEqual(multiplePackageImpJsonFixture);

  // REMOVING PACKAGES
});
