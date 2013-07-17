// Guideline 2.4 - Requirement 2.4.2 Page Titled
// Missing rules:
// Rule 61: Title content should be concise. Last updated: 2011-03-31
// Rule 32: H1 should match a subset of the words in the title element. Last updated: 2011-03-31
// Rule 31: H1 element content should not come only from the alt text of an image. Last updated: 2011-03-31


var Rule = require('../rule').Rule;

var pageTitled = {
  missingH1: new Rule({
    name:    'Missing or empty H1 element',

    message: 'There should be at least one H1 element per page and it shoulnt be empty',

    ruleUrl: 'http://oaa-accessibility.org/rule/14/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var e = [];
      var el;

      dom.$('h1').each(function() {
        e.push(this);
      });

      if ((e.length === 0) || (dom.$(e[0]).text() === '')) {
        el = dom.$(this).parent().html();
        reporter.error(that.message, el, that.name);
        throw el;
      }
    }
  }),

  maximumTwoH1: new Rule({
    name:    'No more than two h1 elements',

    message: 'A document can contain no more than two H1 elements',

    ruleUrl: 'http://oaa-accessibility.org/rule/17/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var e = [];
      var el;

      dom.$('h1').each(function() {
        e.push(this);
      });

      if (e.length > 2) {
        el = dom.$(this).parent().html();
        reporter.error(that.message, el, that.name);
        throw el;
      }
    }
  }),

  hasTitle: new Rule({
    name:    'Title element should not be empty',

    message: 'A document must have a title element',

    ruleUrl: 'http://oaa-accessibility.org/rule/17/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;

      if (!dom.$('title').text()) {
        el = dom.$(this).parent().html();
        reporter.error(that.message, el, that.name);
        throw el;
      }
    }
  }),

  titleMoreThanOneWord: new Rule({
    name:    'Title text must contain more than one word',

    message: 'Title text must contain more than one word',

    ruleUrl: 'http://oaa-accessibility.org/rule/17/',

    level: 'A',

    template: false,

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var el;
      var title = dom.$('title').text();

      if (title.split(' ').length <= 1) {
        el = dom.$(this).parent().html();
        reporter.error(that.message, el, that.name);
        throw el;
      }
    }
  })
};

module.exports = pageTitled;