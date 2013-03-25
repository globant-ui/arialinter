// Guideline 2.4 - Requirement 2.4.4 link purpose
// Missing rules:


var Rule = require('../rule').Rule;

var linkPurpose = {
  linksMoreThan4Chars: new Rule({
    name:    'Link text should be as least four 4 characters long',

    message: 'The links should have more than 4 characters',

    ruleUrl: '',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('a').each(function() {
        if (dom.$(this).text().length <= 4) {
          reporter.error(that.message, 0, that.name);
          throw dom.$(this).parent().html();
        }
      });
    }
  })
};

module.exports = linkPurpose;