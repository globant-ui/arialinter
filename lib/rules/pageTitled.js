// Guideline 2.4 - Requirement 2.4.2 Page Titled

var Rule = require('../rule').Rule;

var pageTitled = {
  missingH1: new Rule({
    name:    'Missing or empty H1 element',

    message: 'There should be at least one H1 element per page and it shoulnt be empty',

    ruleUrl: 'http://oaa-accessibility.org/rule/14/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var e = [];

      dom.$('h1').each(function() {
        e.push(this);
      });

      if ((e.length === 0) || (dom.$(e[0]).text() === '')) {
        reporter.error(that.message, 0, that.name);
        throw dom.$(this).parent().html();
      }
    }
  }),

  onlyOneH1: new Rule({
    name:    'No more than two h1 elements',

    message: 'A document can only contain one H1 element',

    ruleUrl: 'http://oaa-accessibility.org/rule/17/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var e = [];

      dom.$('h1').each(function() {
        e.push(this);
      });

      if (e.length > 1) {
        reporter.error(that.message, 0, that.name);
        throw dom.$(this).parent().html();
      }
    }
  }),
};

module.exports = pageTitled;