const { execSync } = require('child_process');
const fs = require('fs');

test('An empty mcra imp command should create the initial mcra-user-preferences folder and imp.json', () => {
  const doesMcraUserPreferencesDirExist = () => fs.existsSync('./build/adapt/mcra-user-preferences');
  expect(doesMcraUserPreferencesDirExist()).toBe(false);
});
