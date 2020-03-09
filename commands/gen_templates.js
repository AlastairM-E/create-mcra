function initialIndexJsFile (nameOfModule) {
    return `import ${nameOfModule} from '${nameOfModule}/${nameOfModule}.jsx';
        
export default {
    ${nameOfModule},
};`;
};

function reactTemplateFile(nameOfModule) {
    return `/*IMPORTS*/
import React from 'react'; 
    
/*COMPONENT*/
function ${nameOfModule}() {
    
    /*RENDER*/
    return (
    
    ); 
    
};

export default gen_templates;`;
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
    reactTemplateFile,
    jestTestingTemplateFile
};


