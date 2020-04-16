const NavbarJsx = `/* IMPORTS */
import React from 'react'; 
    
/* COMPONENT */
function Navbar() {
    
    /* RENDER */
    return (
    
    ); 
    
};

export default Navbar;`;

const NavbarTestJsx = `/* IMPORTS */
import React from 'react';
import Navbar from './Navbar.jsx';
  
/* TESTS */
test('', () => {
  
});
`;

const IndexJs = `import Navbar from './Navbar/Navbar.jsx';
        
export {
    Navbar,

};`;

const FooterJsx = `/* IMPORTS */
import React from 'react'; 
    
/* COMPONENT */
function Footer() {
    
    /* RENDER */
    return (
    
    ); 
    
};

export default Footer;`;

const FooterTestJsx = `/* IMPORTS */
import React from 'react';
import Footer from './Footer.jsx';
  
/* TESTS */
test('', () => {
  
});
`;

const secondIndexJs = `import Navbar from './Navbar/Navbar.jsx';
import Footer from './Footer/Footer.jsx';

export {
    Navbar,

	Footer,
};`;

const classButtonComponent = `/*IMPORTS*/
import React, { Component, } from 'react'; 
    
/*COMPONENT*/
class Button extends Component {
    
    render() {
        return (
    
        ); 
    };
    
};

export default Button;`;

module.exports = {
  NavbarJsx,
  NavbarTestJsx,
  IndexJs,
  FooterJsx,
  FooterTestJsx,
  secondIndexJs,
  classButtonComponent,
};
