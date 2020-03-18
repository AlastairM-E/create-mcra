# CREATE-MCRA

Extending the tools for the create-react-app project in order to create a custom boilerplate framework.

## Table of Content

* [Getting started](#getting-started).
    * [Creating a project](#creating-a-project).
    * [mcra gen : Generating components](#mcra-gen--generating-components).
    * [mcra adapt : customizing your mcra gen boilerplate](#mcra-adapt--customizing-your-boilerplate).
    * [mcra imp : cutomizing your react cli](#mcra-imp--cutomizing-your-react-cli).
    * [Default mcra gen Boilerplate](#default-boilerplate).
* [Feature-requests](#feature-requests).
* [Issues](#issues).

## Getting Started

### Creating a project

This project uses the create-react-app syntax.

creating the project for npm:

    npx create-mcra <your-foldername> <--any-template-you-want-if-any>

and yarn:

    yarn create mcra <your-foldername> <--any-template-you-want-if-any>

Creates a react app (from the **create-react-app** project), with the follow structure:

```
<your-foldername>/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## mcra gen : Generating components 

To generator a component, please run:

    mcra gen <your-component>

By defalut the components will be a functional react component ([see functional component boilerplate here](##the-contentence-of-the--your-functional-component-jsx-file-is)).

To generate a class react component , run the following instead:

    mcra gen <your-component> -c

([see class component boilerplate here](##the-contentence-of-the--your-class-component-jsx-file-is))

This makes a components folder with the following folder structure:

```
  component/
    index.js
    <your-component>/
        <your-component>.jsx
        <your-component>.test.jsx  
```

To make another component, just run the command again:

    mcra gen <2nd-component>

and this will add the component like so:

```
components/
    index.js
    <2nd-component>/
        <2nd-component>.jsx
        <2nd-component>.test.jsx 
    <your-component>/
        <your-component>.jsx
        <your-component>.test.jsx 

```

### Importing components

You can import your components by reference the components directory, for example:

```
import React from 'react';
import { your-component } from './components';

function App() {
    return (
        <your-component></your-component>
    );
};

export default App;
```

## mcra adapt : customizing your boilerplate

If you dislike the default boilerplate generated from mcra gen, your can customise it to suit your needs.

This is done be running mcra adapt like so in your terminal:

    mcra adapt

The will add a file in your directory called user_gen_templates.js (the following example use the create-react-app file structure):

```
<your-foldername>/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
  user_gen_template.js
```

This will also cause a question to pop up in your terminal (please don't answer the question just yet):
    
    ? Do you to save the changes :  (Y/n) 

### File content

If you enter the user_gen_template.js file, you will see various functions which return the file boilerplate, as shown in the following:

[skip to how to change the boilerplate](#changing-the-boilerplate)

```
function initialIndexJsFile (nameOfModule) {
    return `import ${nameOfModule} from '${nameOfModule}/${nameOfModule}.jsx';
        
export default {
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
```

### Changing the boilerplate

Please **DO NOT** change any of the contentence in initialIndexJsFile function or the module.exports, doing so may cause problems.

Edit the content in the return backticked strings, for example, if I wanted to add an import for my styled components, I would add the following:

```
function reactFunctionalTemplateFile(nameOfModule) {
    return `/*IMPORTS*/
import React from 'react'; 

import styled from 'styled-components'; //<-- My addition
    
/*COMPONENT*/
function ${nameOfModule}() {
    
    /*RENDER*/
    return (
    
    ); 
    
};

export default ${nameOfModule};`;
};
```

Useful things to note:
- Do not tab the string content to be in line with the return statement, this will cause the boilerplate to be 1 tab out when you run mcra gen.
- using the template literal : ${nameOfModule}, will give you the name of the Component.

Then save the change in the user_gen_template.js file and return to the terminal.

Type in Y to save the changes for your file and turn this into your new boilerplate for mcra gen Components.
Type in n to cancel this action.

**Note** : unfortunately, currently the storing of the your custom boilerplate file is in the package's node_modules. Updating mcra will probablely remove all your custom boilerplate appendment, so please **don't update** the create-mcra package unless you have copied the contentence of the user_gen_template.js file (which can get the current version by running mcra adapt again). If you have any idea of how to solve this issue, please make this known on the github page via an issue.

Then just run mcra gen <-Your-Component-Name-> to see the different boilerplate (based on the saving of the custom boilerplate up top):

    mcra gen Navbar

Navbar/Navbar.jsx

```
/*IMPORTS*/
import React from 'react'; 

import styled from 'styled-components';
    
/*COMPONENT*/
function Navbar() {
    
    /*RENDER*/
    return (
    
    ); 
    
};

export default Navbar;`;
```

## mcra imp : cutomizing your react cli

### Implementing packages

This will add custom packages to your react cli or change the react cli entirely so that your have custom starting point whcih suits your needs.

To implement the packages into your react cli run the folloing:

    mcra imp <your-Package-1> <add-another-Package-2> <you-get-the-picture-Package-3>

This will mean that when you run ``` npx create-mcra <your-folder-name>``` or ``` yarn create mcra <your-folder-name> ``` or even ``` mcra <your-folder-name-again> ``` you will install those extra packages as well as dev dependencies (in the exmaple above, when you ran the comands, you would get the npm/yarn packages **your-Package-1 add-another-Package-2 you-get-the-picture-Package-3** to your dev dependecies in your package.json).

### Implementing react clis

If you would like a completely different cli than create-react-app, for example your own personal react boilerplate cli that is in a npm/yarn package, then you can implement that cli using the following (**order of the first 3 keywords DO matter**):

    mcra imp -cli <your-favourite-cli>

This will mean that when you run ``` npx create-mcra <your-folder-name>``` or ``` yarn create mcra <your-folder-name> ``` or even ``` mcra <your-folder-name-again> ```, you will get your-favourite-cli producing the boilerplate, like the create-react-app cli produces it's boilterplate.

### Removing said implementations

You can remove the custom packages you set it you don't want them by running the following (**order of the first 3 keywords DO matter again**):

    mcra imp -rm <your-Package-1> <add-another-Package-2> <you-get-the-picture-Package-3>

This will remove **packages your-Package-1 add-another-Package-2 you-get-the-picture-Package-3** from the react cli, so when you the run ``` npx create-mcra <your-folder-name>``` or ``` yarn create mcra <your-folder-name> ``` or even ``` mcra <your-folder-name-again> ``` you will not have those packages installed in your dev dependecies as part of your boilerplate code.

**Note** : if you impelement any clis/packages via the methods above, currently if you update this package will lose all user preferences. If you like to keep them, them, please find this package within your complete, look for the __node_modules__ and the module __mcra-user-preferences__ whcih should contain a __imp.json__ file. Copy the content of that file and make the __imp.json__ file in the __mcra-user-preferences__ (you may have to make as well) to restore you preferences. Sorry about the really annoying process.

## Default Boilerplate

### The contentence of the < your-functional-component >.jsx file is:

```
/*IMPORTS*/
import React from 'react'; 
    
/*COMPONENT*/
function <your-component>() {
    
    /*RENDER*/
    return (
    
    ); 
    
};

export default <your-component>;
```

### The contentence of the < your-functional-component >.jsx file is:

```
/*IMPORTS*/
import React, { Component, } from 'react'; 

/*COMPONENT*/
class <your-component> extends Component {

    render() {
        return (

        ); 
    };

};
export default <your-component>;
```

### The contentence of the < your-component >.test.jsx file is:

```
/*IMPORTS*/
import React from 'react';  
import <your-component> from './<your-component>.jsx;

/*TESTS*/
test('', () => {

});
```

## Feature requests

If you have ideas for feature requests, **_please make an issue on make the project's GitHub page_** explaining your idea and I will try and implement it.

However, currently I can not review direct code contribution, only ideas.

## Issues

If there are any issue send an issue dictating what you did previous, the unexpected behaviour receieved/error message and I will see If can help.