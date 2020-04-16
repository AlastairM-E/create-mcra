const fs = require('fs');
const adapt = require('../build/adapt/adapt');

afterEach(() => {
  fs.unlinkSync('./user_gen_templates.ts');
  fs.rmdirSync('./build/adapt/mcra-user-preferences');
});

test('testing mcra adapt', () => {
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
});
