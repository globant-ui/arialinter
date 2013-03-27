ArialLinter [![Build Status](https://api.travis-ci.org/globant-ui/arialinter.png?branch=master)](http://travis-ci.org/globant-ui/arialinter)
============
ArialLinter main goal is to provide a simple accesibility linter for HTML documents. Our long-term vision is to enforce accesibility best practices directly into the developer workflow.


##Node Usage

Install the package from npm
```javascript
$ npm install arialinter --save-dev
```

Example
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

##CLI Usage

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
