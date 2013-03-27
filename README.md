ArialLinter [![Build Status](https://api.travis-ci.org/globant-ui/arialinter.png?branch=master)](http://travis-ci.org/globant-ui/arialinter)
============
ArialLinter main goal is to provide a simple accesibility linter for HTML documents. Our long-term vision is to enforce accesibility best practices directly into the developer workflow.


## Getting Started

### Grunt task

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-arialinter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-arialinter');
```

And then you should add the task, you can lint files and url's:

```js
grunt.initConfig({
  arialinter: {
    files: [
      'https://www.google.com/',
      '<!doctype html><html lang="en"><head><title>titulo test</title></head><body style="background-color: white;"> <h1 style="color: black;">hola</h1><img src="asdf.jpg" alt="woop" /> <div class="entry"> <p>{{title}}</p> <h2>By {{author.name}}</h2> <div class="body">{{body}}</div></div> </body> </html>'
    ],
    options: {
      templates: true,
      levels: 'A'
    }
  }
});

grunt.registerTask('default', ['arialinter']);
```

Note: If you dont specify a level, it will run for all the levels.

### Nodejs

You can also use it with nodejs like a regular library

Install the package from npm

```shell
$ npm install arialinter --save-dev
```

And then you can consume the library:

```javascript
var ArialLinter = require('arialinter');
var linter = new ArialLinter();

linter.initialize(fileOrUrl, function() {
  if (linter.evaluate()){
    console.log('success');
  } else {
    console.log('failed');
  }
});
```

### CLI

You can also run AriaLinter from the terminal

Display all the rules

```javascript
$ node index --rules
```

Execute the linter just for templates

```javascript
$ node index --templates test/testFiles/template.html
```

Execute the linter using all the rules of the level A

```javascript
$ node index --level A  test/testFiles/index.html
```

Execute the linter using all the rules of the level A and the rules that just apply for templates

```javascript
$ node index --level A --templates test/testFiles/index.html
```


##Resources:
* Accessibility
 * WAI-ARIA Authoring Practices: http://www.w3.org/TR/wai-aria-practices/
 * http://www.w3.org/TR/WCAG20-TECHS/html.html
 * http://dev.w3.org/html5/alt-techniques/
 * https://dvcs.w3.org/hg/aria-unofficial/raw-file/tip/index.html
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules
* NodeJS HTML Parser
 * [jsdom](https://github.com/tmpvar/jsdom)


##License

Copyright (c) 2013 Globant UI Developers

Licensed under the MIT license.
