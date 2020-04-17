const fs = require('fs');
const path = require('path');
const adapt = require('../build/adapt/adapt');
const { handleResponseTo } = require('../build/adapt/handleResponseTo');

afterEach(() => {
  // check whether the user_gen_templates.ts file exists
  // If it does, then unlink (default else, don't do anything).

  if (fs.existsSync('./build/adapt/mcra-user-preferences/user_gen_templates.ts')) {
    fs.unlinkSync('./build/adapt/mcra-user-preferences/user_gen_templates.ts');
  }
  fs.rmdirSync('./build/adapt/mcra-user-preferences');
});

test('testing mcra adapt works at the beginning and the yes option.', () => {
  // Abstract the test into a function so that I can test the adapt
  // command works multiple times and does jsut perform well one time only.

  function checkAdaptEditingBoilerplateWorks(fixturePath: string): void {
    // Running the test command.
    adapt();
    // see if the user_gen_templates exists.
    const userGenTemplatesTsHasBeenCreated = fs.existsSync('./user_gen_templates.ts');
    expect(userGenTemplatesTsHasBeenCreated).toBe(true);

    // check whether mcra-user-preferences file exists.
    const mcraUserPreferencesDirHasBeenCreated = fs.existsSync('./build/adapt/mcra-user-preferences');
    expect(mcraUserPreferencesDirHasBeenCreated).toBe(true);

    // check whether files have the same text content.
    const userGenTemplateTextContent = fs.readFileSync('./user_gen_templates.ts', 'utf8');
    const commandGenTemplate = fs.readFileSync('./commands/gen_templates.ts', 'utf8');

    expect(userGenTemplateTextContent).toStrictEqual(commandGenTemplate);

    // handleResponseTo run with function then check the file checks
    // exist via readFileSync & write the data from the fixtures.
    const adaptCliAnswer = { confirmChangesToBoilerplate: true };
    const filePaths = { mcraUserGenTemplateTs: '/Users/alastair/Documents/meta-cra/build/adapt/mcra-user-preferences/user_gen_templates.ts' };
    const fixturesGenTemplate = fs.readFileSync(path.join(__dirname, fixturePath), 'utf8');

    fs.writeFileSync('./user_gen_templates.ts', fixturesGenTemplate);

    const updatedUserGenTemplates = fs.readFileSync('./user_gen_templates.ts', 'utf8');

    handleResponseTo(adaptCliAnswer, filePaths);

    // Check that the file exists in the mcra-user-preferences fodler in the build/adapt folder.
    expect(fs.existsSync('/Users/alastair/Documents/meta-cra/build/adapt/mcra-user-preferences/user_gen_templates.ts')).toBe(true);

    const mcraUserPreferenceUserGenTemplates = fs.readFileSync(
      '/Users/alastair/Documents/meta-cra/build/adapt/mcra-user-preferences/user_gen_templates.ts',
      'utf8',
    );

    // Check the content is equal to the new content of the user gen template
    // and not the only template content
    expect(updatedUserGenTemplates).toStrictEqual(mcraUserPreferenceUserGenTemplates);
    expect(mcraUserPreferenceUserGenTemplates).not.toStrictEqual(userGenTemplateTextContent);
  }

  // Repeating multiple times to check it is just succeding one time only.
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/updated_user_gen_template.ts');
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/another_updated_user_gen_template.ts');
  checkAdaptEditingBoilerplateWorks('fixtures/adapt/updated_user_gen_template.ts');


  adapt();
  const adaptCliAnswer = { confirmChangesToBoilerplate: false };
  const filePaths = { mcraUserGenTemplateTs: '/Users/alastair/Documents/meta-cra/build/adapt/mcra-user-preferences/user_gen_templates.ts' };

  // Make an edit using the fixtures.
  // read what is inside the fixtures.

  handleResponseTo(adaptCliAnswer, filePaths);
});

test('adapt --> no changes option', () => {
  // calling adapt.
  // then call handle response.
  adapt();
  const adaptCliAnswer = { confirmChangesToBoilerplate: false };
  const filePaths = { mcraUserGenTemplateTs: '/Users/alastair/Documents/meta-cra/build/adapt/mcra-user-preferences/user_gen_templates.ts' };

  // Make an edit using the fixtures.
  // read what is inside the fixtures.

  handleResponseTo(adaptCliAnswer, filePaths);

  // check that the content the mcraUserGenTemplateTs is not equal to the edits
  // that have occured there. Do this in the other file as there changes
  // that are already inside there.

  // There should be a user_gen_tempalte file in the root diroctory.
  // At the end of the session. This should also be the previous test as well
  const userGenTemplateExist = fs.existsSync('./user_gen_templates');
  expect(userGenTemplateExist).toBe(false);
});
