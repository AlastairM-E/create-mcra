const {
  initialIndexJsFile, reactFunctionalTemplateFile, reactClassTemplateFile, jestTestingTemplateFile,
} = require('../build/gen_templates');

const {
  initialIndexJsFixture,
  reactFunctionalTemplateFixture,
  reactClassTemplateFixture,
  jestTestingTemplateFixture,
} = require('./fixtures/gen_templates/index.ts');

test('The initialIndexJsFile function works as intented', () => {
  expect(initialIndexJsFile('Navbar')).toStrictEqual(initialIndexJsFixture);
});

test('The reactFunctionalTemplateFile function works as intented', () => {
  expect(reactFunctionalTemplateFile('Navbar')).toStrictEqual(reactFunctionalTemplateFixture);
});

test('The reactClassTemplateFile function works as intented', () => {
  expect(reactClassTemplateFile('Navbar')).toStrictEqual(reactClassTemplateFixture);
});

test('The jestTestingTemplateFile function works as intented', () => {
  expect(jestTestingTemplateFile('Navbar')).toStrictEqual(jestTestingTemplateFixture);
});
