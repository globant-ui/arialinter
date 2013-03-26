ArialLinter [![Build Status](https://api.travis-ci.org/globant-ui/arialinter.png?branch=master)](http://travis-ci.org/globant-ui/arialinter)
============
ArialLinter main goal is to provide a simple accesibility linter for HTML documents. Our long-term vision is to enforce accesibility best practices directly into the developer workflow.


##Usage

Display all the rules
```javascript
$ node index --rules
```

Execute the linter just for templates
```javascript
$ node index.js --templates test/testFiles/template.html
```
Execute the linter using all the rules of the level A
```javascript
$ node index.js --level A  test/testFiles/index.html
```
Execute the linter using all the rules of the level A and the rules that just apply for templates
```javascript
$ node index.js --level A --templates test/testFiles/index.html
```

##Rules Missing

Guideline | Rule N | Description
----------|--------|-----------------------------------------
1.3       |   10   | Complex data tables must have ids on th elements. Last updated: 2011-03-31
1.3       |   11   | For complex data tables table ids must be unique. Last updated: 2011-03-31
1.3       |   12   | Complex data table td elements must have header attributes. Last updated: 2011-03-31
1.4       |   16   | Color contrast ratio should be > 4.5 Last updated: 2011-03-31
2.4       |   42   | Heading elements should be properly nested. Last updated: 2011-03-31
2.4       |   43   | The content of the headings of the same level within the same section should be unique. Last updated: 2011-03-31
2.4       |   40   | Text content for a headings must not come just from image alt text. Last updated: 2011-03-31
2.4       |   41   | Heading content should be concise. Last updated: 2011-03-31
2.4       |   44   | Heading elements (h1..h6) should be used for structuring information on the page. Last updated: 2011-03-31
3.3       |   49   | Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute. Last updated: 2011-03-31
3.3       |   53   | Effective labels should be unique. Last updated: 2011-03-31
3.3       |   56   | Title attributes used for labeling form controls must have content. Last updated: 2011-03-31
2.4       |   35   | Links with the same HREF should have the same link text. Last updated: 2011-03-31
2.4       |   36   | Links that point to different HREFs should have different link text. Last updated: 2011-03-31
2.4       |   37   | Images should be at least 16 pixels by 16 pixels when used as links. Last updated: 2011-03-31
2.4       |   38   | Links with images and text content, the alt attribute should be unique to the text content or empty
2.4       |   61   | Title content should be concise. Last updated: 2011-03-31
2.4       |   32   | H1 should match a subset of the words in the title element. Last updated: 2011-03-31
2.4       |   31   | H1 element content should not come only from the alt text of an image. Last updated: 2011-03-31
4.1       |   64   | ARIA attributes have valid values Last updated: 2011-03-31
4.1       |   65   | ARIA ID references must be valid IDRefs Last updated: 2011-03-31
4.1       |   66   | ARIA attributes can only be used with certain roles Last updated: 2011-03-31
4.1       |   63   | Check aria properties and states for valid roles and properties Last updated: 2011-03-31
4.1       |   67   | Roles must contain their required child roles Last updated: 2011-03-31
4.1       |   68   | Child roles must be contained by the proper parent role Last updated: 2011-03-31
4.1       |   69   | Required properties and states should be defined Last updated: 2011-03-31
4.1       |   70   | Required properties and states must not be empty Last updated: 2011-03-31
4.1       |   71   | Role value must be valid Last updated: 2011-03-31
4.1       |   72   | Check that 'ARIA-' attributes are valid properties and states Last updated: 2011-03-31



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
