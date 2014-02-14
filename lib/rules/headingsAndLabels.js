// Guideline 2.4 - Requirement 2.4.6 headings and labels
// Missing rules:
// Rule 42: Heading elements should be properly nested. Last updated: 2011-03-31
// Rule 43: The content of the headings of the same level within the same section should be unique. Last updated: 2011-03-31
// Rule 40: Text content for a headings must not come just from image alt text. Last updated: 2011-03-31
// Rule 41: Heading content should be concise. Last updated: 2011-03-31
// Rule 44: Heading elements (h1..h6) should be used for structuring information on the page. Last updated: 2011-03-31

(function() {
  'use strict';
  var Rule = require('../rule');

  module.exports = {
    headingsHasContent: new Rule({
      name:    'Headings must have text content',

      message: 'All heading elements (h1..h6) should have text content',

      ruleUrl: 'oaa-accessibility.org/rule/39/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        var checkHeadingText = function(element, dom) {
          dom.$(element).each(function() {
            if (dom.$(this).text().length < 1) {
              throw {
                reportType: 'error',
                el: dom.$(this).parent().html()
              };
            }
          });
        };

        checkHeadingText('h1', dom);
        checkHeadingText('h2', dom);
        checkHeadingText('h3', dom);
        checkHeadingText('h4', dom);
        checkHeadingText('h5', dom);
        checkHeadingText('h6', dom);
      }
    })
  };
}());
