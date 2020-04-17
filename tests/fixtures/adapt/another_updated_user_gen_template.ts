function initialIndexJsFile(nameOfModule: string) {
  return `import ${nameOfModule} from './${nameOfModule}/${nameOfModule}.jsx';
            
    export {
        ${nameOfModule},
    
    };`;
}

function reactFunctionalTemplateFile(nameOfModule: string) {
  return `/* IMPORTS */
    import React from 'react'; 
  
    import styled from 'styled-components';
        
    /* COMPONENT */
    function ${nameOfModule}() {
        
        /* RENDER */
        return (
        
        ); 
        
    };
    
    export default ${nameOfModule};`;
}

function reactClassTemplateFile(nameOfModule: string) {
  return `/*IMPORTS*/
    import React, { Component, } from 'react'; 

    import styled from 'styled-components';
        
    /*COMPONENT*/
    class ${nameOfModule} extends Component {
        
        render() {
            return (
        
            ); 
        };
        
    };
    
    export default ${nameOfModule};`;
}

function jestTestingTemplateFile(nameOfModule: string) {
  return `/* IMPORTS */
    import React from 'react';
    import ${nameOfModule} from './${nameOfModule}.jsx';
      
    /* TESTS */
    test('', () => {
      
    });
    `;
}

module.exports = {
  initialIndexJsFile,
  reactFunctionalTemplateFile,
  reactClassTemplateFile,
  jestTestingTemplateFile,
};
