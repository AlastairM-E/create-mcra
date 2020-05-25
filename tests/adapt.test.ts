const fs = require('fs');
const path = require('path');
const adapt = require('../build/adapt/adapt');
const { handleResponseTo } = require('../build/adapt/handleResponseTo');

const mcraUserPreferencesDir = path.join(__dirname, '../mcra-user-preferences');
const mcraUserGenTemplatePath = path.join(__dirname, 'mcra-user-preferences/user_gen_templates.ts');

/* CLEAN UP ADAPT COMMAND */
// check whether the user_gen_templates.ts file exists
// If it does, then unlink (default else, don't do anything).
function cleanUpAdaptCommand() {
  if (fs.existsSync(mcraUserGenTemplatePath)) {
    fs.unlinkSync(mcraUserGenTemplatePath);
  }
  fs.rmdirSync(mcraUserPreferencesDir);
}

afterEach(() => {
  cleanUpAdaptCommand();
});

/* ADAPT COMMAND WHICH EDITS THE FILE */
test('testing mcra adapt works at the beginning and the yes option.', () => {
  /* CHECK INITIAL SETUP OF ADAPT COMMAND */
  // check whether mcra-user-preferences dir exists.
  // check whether the user_gen_template.ts exists.
  // check whether files have the same text content.
  function checkInitSetup() {
    adapt();

    const userGenTemplatesTsHasBeenCreated = fs.existsSync('./user_gen_templates.ts');
    expect(userGenTemplatesTsHasBeenCreated).toBe(true);

    const mcraUserPreferencesDirHasBeenCreated = fs.existsSync(mcraUserPreferencesDir);
    expect(mcraUserPreferencesDirHasBeenCreated).toBe(true);

    const userGenTemplateTextContent = fs.readFileSync('./user_gen_templates.ts', 'utf8');
    const commandGenTemplate = fs.readFileSync('./commands/gen_templates.ts', 'utf8');

    expect(userGenTemplateTextContent).toStrictEqual(commandGenTemplate);
    cleanUpAdaptCommand();
  }

  /* CHECKING ADAPT EDITS THE BOILERPLATE CORRECTLY */
  // Abstract the test into a function so that I can test the adapt
  // command works multiple times and does jsut perform well one time only.
  // Running the test command.
  // see if the user_gen_templates exists.
  // handleResponseTo run with function then check the file checks
  // exist via readFileSync & write the data from the fixtures.
  // Check that the file exists in the mcra-user-preferences fodler in the build/adapt folder.
  // Check the content is equal to the new content of the user gen template
  // and not the only template content
  function checkAdaptEditingBoilerplateWorks(fixturePath: string): void {
    adapt();

    const userGenTemplateTextContent = fs.readFileSync('./user_gen_templates.ts', 'utf8');
    const adaptCliAnswer = { confirmChangesToBoilerplate: true };
    const filePaths = { mcraUserGenTemplatePath };
    const fixturesGenTemplate = fs.readFileSync(path.join(__dirname, fixturePath), 'utf8');

    fs.writeFileSync('./user_gen_templates.ts', fixturesGenTemplate);

    const updatedUserGenTemplates = fs.readFileSync('./user_gen_templates.ts', 'utf8');

    handleResponseTo(adaptCliAnswer, filePaths);

    expect(fs.existsSync(mcraUserGenTemplatePath)).toBe(true);

    const mcraUserPreferenceUserGenTemplates = fs.readFileSync(
      mcraUserGenTemplatePath,
      'utf8',
    );

    expect(updatedUserGenTemplates).toStrictEqual(mcraUserPreferenceUserGenTemplates);
    expect(mcraUserPreferenceUserGenTemplates).not.toStrictEqual(userGenTemplateTextContent);
  }

  /* MULTI CHECKING THE ADAPT COMMAND */
  // Repeating multiple times to check it is just succeding one time only.
  checkInitSetup();
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/updated_user_gen_template.ts');
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/another_updated_user_gen_template.ts');
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/updated_user_gen_template.ts');


  // Run the adapt command.
  // Do an addition by using fixtures X.
  // save the changes.
  // Then run the adapt command again.
  // Make changes via fixtures Y.
  // Check that contentence the mcra user_gen_template has remained
  // the same and has not changed to fixtures Y.
  // Also do a test in which you have the docuemnt complete blank --> add answer no.
  // Check that the code the same as the intial setup.

  adapt();

  const fixturesGenTemplate = fs.readFileSync(path.join(__dirname, './fixtures/adapt/another_updated_user_gen_template.ts'), 'utf8');
  fs.writeFileSync('./user_gen_templates.ts', fixturesGenTemplate);

  const updatedUserGenTemplates = fs.readFileSync('./user_gen_templates.ts', 'utf8');
  const currentMcraUserGenTemplates = fs.readFileSync(
    mcraUserGenTemplatePath,
    'utf8',
  );

  const adaptCliAnswer = { confirmChangesToBoilerplate: false };
  const filePaths = { mcraUserGenTemplatePath };

  handleResponseTo(adaptCliAnswer, filePaths);

  expect(currentMcraUserGenTemplates).not.toStrictEqual(updatedUserGenTemplates);

  const theFixtureTheMcraTemplateIsBasedOff = fs.readFileSync(
    path.join(__dirname, './fixtures/adapt/updated_user_gen_template.ts'),
    'utf8',
  );
  expect(currentMcraUserGenTemplates).toStrictEqual(theFixtureTheMcraTemplateIsBasedOff);
});

test('adapt --> no changes option', () => {
  // ^=* Also do a test in which you have the docuemnt complete blank --> add answer no.
  // ^=* Check that the code the same as the intial setup.
  // If done reverse, the folder should be created.
  adapt();
  const adaptCliAnswer = { confirmChangesToBoilerplate: false };
  const filePaths = { mcraUserGenTemplatePath };

  handleResponseTo(adaptCliAnswer, filePaths);

  const userGenTemplateExist = fs.existsSync('./user_gen_templates');
  expect(userGenTemplateExist).toBe(false);

  const mcraUserPreferencesDirHasBeenCreated = fs.existsSync(mcraUserPreferencesDir);
  expect(mcraUserPreferencesDirHasBeenCreated).toBe(true);
});
