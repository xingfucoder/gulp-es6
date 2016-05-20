# Gulp.js + ES-2015 Features

Package for creating Gulp.Js tasks using some of the new ES2015 features:

 - New Class definitions.
 - ES6 Module Exports/Imports.
 - Arrow Functions
 - ...

## 1- Requirements

 In order to use some of the EcmaScript 2015 features you need to install these dependencies:

 - [babel-core](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015) Babel preset for es2015 plugins

 - [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-core) Babel compiler core

 - [babel-register](https://github.com/babel/babel/tree/master/packages/babel-register)  Required hook to bind that to NodeJS require functionality compiling files on the fly

To install those dependencies located in the `devDependencies`section of the `package.json` file, run the next CLI command:

    npm install

## 2. After install process of all those dependencies using the previous command, you need to create a `.babelrc` configuration file with the next options:

```
{
    "preset": ["es2015"]
}
```

> Alternatively you may use with the CLI command:

    $ babel script.js --presets es2015

## 3- Rename your gulpfile.js

 You need to use `Babel` to get the ES2015 features, then rename your `gulpfile.js` to `gulpfile.babel.js`. The content of this file will be the same as the original `gulpfile.js` files.

## 4- Create your custom **Gulp Transformer** class.

 In example, we created to illustrate this package one `Jade2HTMLTransformer` class that you can find in the `Transformer` folder. It receives two params: the **source directory** where the source **JADE** files will be located, and the **destination directory** where the **HTML** output files will be located.
 
 This is the code of the `Jade2HTMLTransformer` class:
 
```javascript
require("babel-register");

import gulp from "gulp";
import gulpPug from 'gulp-pug';

class Jade2HTMLTransformer {

    /**
     * @param  {any} options={}
     */
    constructor(options = {}) {
        this._options = options;
    }

    /**
     * @param  {[string|string[]]} src
     * @param  {[string|string[]]} dest
     */
    transform(src, dest) {
        return gulp.src(src)
            .pipe(gulpPug(this._options))
            .pipe(gulp.dest(dest));
    };
}

module.exports.Jade2HTMLTransformer = Jade2HTMLTransformer;
 ```

Let's go to review the `Jade2HTMLTransformer` transformer class to review some of the new ES-2015 (ES6) features included here:

 - We need to use only one `require` expression to get access to the `babel-register` package. It allows us to use the `import` expressions replacing all the `require` module imports.
 
 - We use the `import` expressions in order to import all required modules. In our example we need: `gulp` and `gulp-pub` (the new name for the `gulp-jade` package).
 
 - The next step is define your own Tranformer class. You may use an abstract class to inherits from that, or use directly one specific CustomTransformer class. In our example `Jade2HTMLTransformer` we only use that specific class.
 
 - That class is only available when you uses the ES2015 feature through **EcmaScript** or using **TypeScript** (a superset of ES2015). This class includes some new ES2015 features such as:
 
  - Class constructors with params.
  - Custom methods, in our case the transform method.
 
 The `constructor` accepts only one `Object`, with an empty object by default param for customize your `gulp-pug` task. In our example, using this parameter you may view we use the `pretty: true` option to avoid the minification process when you execute JADE to HTML conversion.
 
 The transform method is returning a gulp process result of applying the next steps:
 
  - Get the source folder from the source param of the `Jade2HTMLTransform transform` method.
  - Use the `gulp-pug` imported function to execute with the `pipe` process of gulp.
  - Get the destination folder to put the HTML resulting of the process.

 > We will be adding some additional options to extends the Transformer Classes using the **Decorator Pattern** to provide them the possibility of chain different related utility processss.

## 5- Populate your gulpfile.babel.js with your custom Transformer Tasks

 When you need to execute a custom **GulpJS Transform Task**, you need to create a general tasks that calls your custom Transformer Class as following:
 
 ```javascript
import gulp from 'gulp';
import { Jade2HTMLTransformer } from './Transformers/Jade2HTMLTransformer';

let jade2htmlTransformer = new Jade2HTMLTransformer({pretty: true});

gulp.task('Jade2HTML', () => {
    jade2htmlTransformer.transform('Examples/Jade2HTML/templates/*.jade', 'dist');
    /*(new Jade2HTMLTransformer(
        {pretty: true}
    ))
    .transform('Examples/Jade2HTML/templates/*.jade', 'dist')
    */
});
 ```
 
 Let's go to comment the content of the `gulpfile.babel.js` file:
 
  - First you need to require your gulp module using the `import` expression.
  
  - Import with the same method your Custom Transformer Class.
  
  - Declare a variable to get an instance of the Custom Transformer.
  
  - Create your general task, give it a name and you may use a generic classical function or use, as you may see an **arrow function** to reduce the complexity of the code. In our case we uses an arrow function, with no params, and using the  transform method of the `jade2htmlTransformer` which requiress the two params of the class method, a) the source folder, and b) the destination folder.
  
  > You may use Array or String params for the source and destination folders.
  
  > Alternatively you may use the second commented version of the `Jade2HTMLTransformer` constructor.

  ```
  (new Jade2HTMLTransformer({pretty: true}))
       .transform('Examples/Jade2HTML/templates/*.jade', 'dist');
  ```

## 6- The Gulp task execution process

In order to execute your custom GulpJS Transformer you need to run:

    gulp [your-custom-transformer-task] //For our example gulp jade2HTML

 The resulting CLI output is:
 
 ```
 [HH:MM:SS] Requiring external module babel-register
 [HH:MM:SS] Using gulpfile ~\Projects\gulp-es6\gulpfile.babel.js
 [HH:MM:SS] Starting 'Jade2HTML'...
 [HH:MM:SS] Finished 'Jade2HTML' after 12 ms
 ```
 Then review your `dist` or custom destination folder to the **HTML** resulting files.
 
## 6- Other information

As you may have seen, we are using **JSDoc** annotation, for get more knowledge about that go to the next site [JSDoc](http://usejsdoc.org/)

## 7- Folder Structure of the Package

 The structure of the package is based on the possibility of extend this with some other Custom Transformer Classes.
 
 This structure is the following:
 
  ```
  GULP-ES6
  └── Examples
      └── Jade2HTML
          └── index.jade
  └── Transformers
      └── Jade2HTMLTransformer.js
  └── .babelrc
  └── .gitignore
  └── gulpfile.babel.js
  └── LICENSE.txt
  └── package.json
  └── README.md
  ```

## 7- Sample code

We will be adding some other Custom GulpJS Transformers or Utilities in this repository. Feel free to fork that and add your own Custom Transformer.

## 8 - License

This Gulp-ES6 package is open-sourced licensed under the [ISC License](https://opensource.org/licenses/ISC).
