const fs = require('fs');
const { execSync } = require('child_process');
const {
  NavbarJsx,
  NavbarTestJsx,
  IndexJs,
  FooterJsx,
  FooterTestJsx,
  secondIndexJs,
  classButtonComponent,
} = require('./fixtures/gen/template.ts');

beforeEach(() => {
  execSync('rm -R ./src/components');
});

test('gen test should work', () => {
  // Run the gen command.
  execSync('mcra gen Navbar');

  // Check whether components folder exists.
  const componentsDirDoesExist = fs.existsSync('./src/components');
  expect(componentsDirDoesExist).toBe(true);

  // Check the contentence of the Components and test fil to match the fixtures content.
  const indexJsTextContent = () => fs.readFileSync('./src/components/index.js', 'utf8');
  const navbarTextContent = fs.readFileSync('./src/components/Navbar/Navbar.jsx', 'utf8');
  const navbarTestTextContent = fs.readFileSync('./src/components/Navbar/Navbar.test.jsx', 'utf8');

  expect(indexJsTextContent()).toStrictEqual(IndexJs);
  expect(navbarTextContent).toStrictEqual(NavbarJsx);
  expect(navbarTestTextContent).toStrictEqual(NavbarTestJsx);

  // Run another cration of a component
  execSync('mcra gen Footer');

  // Check the content of the components and the tests as wella s teh index.js file to check
  // It matches the fixtures content.

  const footerTextContent = fs.readFileSync('./src/components/Footer/Footer.jsx', 'utf8');
  const footerTestTextContent = fs.readFileSync('./src/components/Footer/Footer.test.jsx', 'utf8');

  expect(indexJsTextContent()).toStrictEqual(secondIndexJs);
  expect(footerTextContent).toStrictEqual(FooterJsx);
  expect(footerTestTextContent).toStrictEqual(FooterTestJsx);

  // Run another gen command with the class component flag:
  execSync('mcra gen Button -c');

  // get the conent from the Button folder of the Button.jsx file.
  // check it matches the fixtures content.
  const classButtonComponentTextContent = fs.readFileSync('./src/components/Button/Button.jsx', 'utf8');

  expect(classButtonComponentTextContent).toStrictEqual(classButtonComponent);
});
