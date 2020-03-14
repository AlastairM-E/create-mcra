# CREATE-MCRA

Extending the tools for the create-react-app project in order to create a custom boilerplate framework.

## Table of Content

* [Getting started](#getting-started).
    * [Creating a project](#creating-a-project).
    * [Generating components](#generating-components).
    * [Boilerplate](#boilerplate).
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

### Generating components 

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

## Boilerplate

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