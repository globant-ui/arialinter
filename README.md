### --This Package has been **deprecated** as we can not longer mantain it.--

AriaLinter [![Build Status](https://api.travis-ci.org/globant-ui/arialinter.png?branch=master)](http://travis-ci.org/globant-ui/arialinter) ![Dependencies](https://david-dm.org/globant-ui/arialinter.png)
============
AriaLinter goal is twofold:
* provide a simple accessibility linter for HTML documents
* provide a Grunt task based on the linter in order to integrate accesibility best practices right into the build system

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
      files: ['partials/**/*.html', 'components/**/*.hbs'],
      options: {
        level: 'A',
        templates: true,
        rules: {
          contrastMinimum: false,
          doNotUseElementBlink: true
        }
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
* rules: enable or disable a given rule. Overwrites level option.

### Nodejs

You can also use it with nodejs like a regular library

Install the package from npm

```shell
$ npm install arialinter --save-dev
```

Then, using arialinter, is as easy as:

```javascript
var AriaLinter = require('arialinter');

AriaLinter.initialize('https://github.com/', function() {
  if (AriaLinter.evaluate()){
    console.log('All rules were successfully passed');
  } else {
    console.log('AriaLinter found ' + AriaLinter.getErrorsFound() + ' accessibility issues');
    console.log(AriaLinter.getReport('text', 'https://github.com/'));
  }
});
```

You can also pass an options argument to the evaluate() method:

```javascript
var AriaLinter = require('arialinter');

AriaLinter.initialize('https://github.com/', function() {
  if (AriaLinter.evaluate({level: 'A', template: true})){
    console.log('All rules were successfully passed');
  } else {
    console.log('AriaLinter found ' + AriaLinter.getErrorsFound() + ' accessibility issues');
    console.log(AriaLinter.getReport('text', 'https://github.com/'));
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

## Related projects:
* [A11YLint](https://github.com/DuaneOBrien/A11YLint-Brackets). A11YLint is an extension for the Brackets IDE which
aims to bring the same kind of in-context, immediate feedback that you get from JSLint/JSHint and other linting tools,
but regarding issues in your HTML that would affect how accessible your content is.
* [gulp-arialinter](https://github.com/Charca/gulp-arialinter). Gulp plugin for the accessibility tool AriaLinter.

## Resources:
* Accessibility
 * WAI-ARIA Authoring Practices: http://www.w3.org/TR/wai-aria-practices/
 * http://www.w3.org/TR/WCAG20-TECHS/html.html
 * http://dev.w3.org/html5/alt-techniques/
 * https://dvcs.w3.org/hg/aria-unofficial/raw-file/tip/index.html
 * http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules

## License

Copyright (c) 2013 Globant UI Developers

Licensed under the MIT license.
