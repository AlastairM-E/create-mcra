const faker = require('faker');
const { newCli, tryToInstallAdditionalPackages } = require('../build/createBoilerplate/index');

/* TESTS */
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

test('tryToInstallAdditionalPackages returns the apprioprate command which can will lead to the installation of a package', () => {
  // Check that the module returns an empy string no additional packages.
  // Check that when it is 'yarn' as the package manager, 'add' as the dev installation
  //     and the addtional packagesas the additional packages.
  // Check that when npm is passed, the additional packages are returned
  // and with a dev installiation of 'install'.
  const noAdditionalPackagesCommand = tryToInstallAdditionalPackages('npm', null);
  expect(noAdditionalPackagesCommand).toStrictEqual(false);

  const fakePackageName = faker.lorem.word();
  const additionalPackages = [fakePackageName, 'aRandomFakerPackage'];
  const npmAdditionalPackagesCommand = tryToInstallAdditionalPackages('npm', additionalPackages);

  expect(npmAdditionalPackagesCommand).toStrictEqual(`npm install ${fakePackageName} aRandomFakerPackage`);

  const yarnAdditionalPackagesCommand = tryToInstallAdditionalPackages('yarn', additionalPackages);

  expect(yarnAdditionalPackagesCommand).toStrictEqual(`yarn add ${fakePackageName} aRandomFakerPackage`);
});
