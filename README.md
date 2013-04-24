[AriaLinter](http://arialinter.aws.af.cm/) [![Build Status](https://api.travis-ci.org/globant-ui/arialinter.png?branch=master)](http://travis-ci.org/globant-ui/arialinter)
============
AriaLinter goal is twofold:
* provide a simple accessibility linter for HTML documents
* provide a Grunt task based on the linter in order to integrate accesibility best practices
right into the developer workflow

## Demo

The demo is currently deployed in http://arialinter.aws.af.cm/.


## Getting Started

### Grunt task

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
$ npm install grunt-arialinter --save-dev
```

Once the plugin has been installed, it can be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-arialinter');
```

Afterwards, files, markup, and url's can be linted:

```js
grunt.initConfig({
  arialinter: {
    files: [
      'https://www.google.com/',
      './templates/*.html',
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

Options:
* templates: if templates is **true** then a subset of the rules will be run. This subset comprises those rules
that can be checked against a static HTML template. Rules that require checking the correct event-handlers or any other
dynamic condition wont be run. By contrast, if templates is **false** then all rules will be run
* levels: indicates which rules will be run according to the level they belong to. If you dont specify any level, it'' run for all the levels.

### Nodejs

You can also use it with nodejs like a regular library

Install the package from npm

```shell
$ npm install arialinter --save-dev
```

Then, using arialinter, is as easy as:

```javascript
var AriaLinter = require('arialinter');
var linter = new AriaLinter();

linter.initialize(fileOrUrl, function() {
  if (linter.evaluate()){
    console.log('success');
  } else {
    console.log('failed');
  }
});
```

You can also pass an options argument to the evaluate() method:

```javascript
var AriaLinter = require('arialinter');
var linter = new AriaLinter();

linter.initialize(fileOrUrl, function() {
  if (linter.evaluate({level: 'A', template: true})){
    console.log('success');
  } else {
    console.log('failed');
  }
});
```

### CLI

To run arialinter from the command line:

```shell
$ npm install -g arialinter
```

Display all the rules

```javascript
$ arialinter --rules
```

Execute the linter just for templates

```javascript
$ arialinter --templates test/testFiles/template.html
```

Execute the linter using all the rules of the level A

```javascript
$ arialinter --level A  test/testFiles/index.html
```

Execute the linter using all the rules of the level A and the rules that just apply for templates

```javascript
$ arialinter --level A --templates test/testFiles/index.html
```


##Resources:
* Accessibility
 * WAI-ARIA Authoring Practices: http://www.w3.org/TR/wai-aria-practices/
 * http://www.w3.org/TR/WCAG20-TECHS/html.html
 * http://dev.w3.org/html5/alt-techniques/
 * https://dvcs.w3.org/hg/aria-unofficial/raw-file/tip/index.html
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules


##License

Copyright (c) 2013 Globant UI Developers

Licensed under the MIT license.
