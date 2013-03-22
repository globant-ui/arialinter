// Guideline 1.3 Adaptable
/*
  Missing rules:
    10, 11, 12

*/

var Rule = require('../rule').Rule;

var adaptable = {
  tableHasSummary: new Rule({
    name:    'Data tables must use summary attribute',

    message: 'Please add the summary attribute to this table',

    ruleUrl: 'http://oaa-accessibility.org/rule/3/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('table').each(function() {
        if (!dom.$(this).attr('summary')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  }),

  tableMustHaveTh: new Rule({
    name:    'Data tables must use th elements',

    message: 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows',

    ruleUrl: 'http://oaa-accessibility.org/rule/4/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;

      dom.$('table').each(function() {

        if (!dom.$(this).find('th')) {
          reporter.error(that.message, 0, that.name);

          throw dom.$(this).parent().html();
        }
      });
    }
  }),

  uniqueSummaryAttr: new Rule({
    name:    'Summary attribute content must be unique',

    message: 'The summary atribute from the tables should be unique',

    ruleUrl: 'http://oaa-accessibility.org/rule/5/',

    callback: function(dom, reporter) {
      'use strict';

      var that = this;
      var s = [];

      dom.$('table').each(function() {

        var e = dom.$(this).attr('summary');

        if (s.indexOf(e) > -1) {
          s.push(e);
        } else {
          reporter.error(that.message, 0, that.name);
          throw dom.$(this).parent().html();
        }

      });

    }
  }),

};

module.exports = adaptable;