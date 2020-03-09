# **CREATE-MCRA**

Extending the tools for the create-react-app project in order to improve Developer Experience.

## Table of Content

* [Getting started](#getting-started).
* [Feature-requests](#feature-requests).
* [Issues](#issues)

## **Getting Started**

### Creating a project

This project uses the create-react-app syntax, so:

when running the project for npm:

    npx create-mcra <your-foldername> <--any-template-you-want-if-any>

and when running this project using yarn:

    yarn create mcra <your-foldername> <--any-template-you-want-if-any>

This will create a react app from the **create-react-app** project with the follow structure:

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

To generator a component, please run the following command:

    mcra gen <your-component>

This will make a components folder with with the following component structure:

```
  component/
    index.js
    <your-component>/
        <your-component>.jsx
        <your-component>.test.jsx  
```

If would like to have another component, then just run the command again:

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

The contentence of the < your-component >.jsx file is:

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

and the contentence of the < your-component >.test.jsx file is:

```
/*IMPORTS*/
import React from 'react';  
import <your-component> from './<your-component>.jsx;

/*TESTS*/
test('', () => {

});
```

you can then import the components by reference the components directory, so for example:

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

## **feature requests**

If you have ideas for feature requests, **_please make an issue on make the project's GitHub page_** explaining your idea and I will try and implement it.

However, currently I can not review direct code contribution, only ideas.

## **Issues**

If there are any issue send an issue dictating what you did previous, the unexpected behaviour receieved/error message and I will see If can help.