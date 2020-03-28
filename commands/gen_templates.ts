function initialIndexJsFile (nameOfModule) {
    return `import ${nameOfModule} from './${nameOfModule}/${nameOfModule}.jsx';
        
export {
    ${nameOfModule},

};`;
};

function reactFunctionalTemplateFile(nameOfModule) {
    return `/*IMPORTS*/
import React from 'react'; 
    
/*COMPONENT*/
function ${nameOfModule}() {
    
    /*RENDER*/
    return (
    
    ); 
    
};

export default ${nameOfModule};`;
};

function reactClassTemplateFile(nameOfModule) {
    return `/*IMPORTS*/
import React, { Component, } from 'react'; 
    
/*COMPONENT*/
class ${nameOfModule} extends Component {
    
    render() {
        return (
    
        ); 
    };
    
};

export default ${nameOfModule};`;
};

function jestTestingTemplateFile(nameOfModule) {
    return `/*IMPORTS*/
import React from 'react';  
import ${nameOfModule} from './${nameOfModule}.jsx;

/*TESTS*/
test('', () => {

});`;
};

module.exports = {
    initialIndexJsFile,
    reactFunctionalTemplateFile,
    reactClassTemplateFile,
    jestTestingTemplateFile
};


