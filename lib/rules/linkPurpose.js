// Guideline 2.4 - Requirement 2.4.4 link purpose
// Missing rules:
// Rule 35: Links with the same HREF should have the same link text. Last updated: 2011-03-31
// Rule 36: Links that point to different HREFs should have different link text. Last updated: 2011-03-31
// Rule 37: Images should be at least 16 pixels by 16 pixels when used as links. Last updated: 2011-03-31
// Rule 38: Links with images and text content, the alt attribute should be unique to the text content or empty


var Rule = require('../rule').Rule;

var linkPurpose = {
  linksAtLeast4Chars: new Rule({
    name:    'Link text should be as least four 4 characters long',

    message: 'The links should have 4 or more characters',

    ruleUrl: 'http://www.openajax.org/member/wiki/Accessibility_-_WCAG20_Validation_Rules',

    level: 'A',

    template: true,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('a').each(function() {
        if (dom.$(this).text().length < 4) {
          throw {
            reportType: 'error',
            el: dom.$(this).parent().html()
          };
        }
      });
    }
  })
};

module.exports = linkPurpose;