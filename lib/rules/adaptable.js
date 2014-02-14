// Guideline 1.3 Adaptable
/*
  Missing rules:
    10, 11, 12

  Removed rules:
   http://oaa-accessibility.org/rule/3/
   http://oaa-accessibility.org/rule/5/
  since the use of a summary attr has been deprecated
*/

(function() {
  'use strict';

  var Rule = require('../rule');

  module.exports = {

    tableMustHaveTh: new Rule({
      name:    'Data tables must use th elements',

      message: 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows',

      ruleUrl: 'http://oaa-accessibility.org/rule/4/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        dom.$('table').each(function() {
          var numberOfRows = dom.$(this).find('tr');
          var numberOfRowHeaders = dom.$(this).find('th');
          if (numberOfRows !== numberOfRowHeaders) {
            throw {
              reportType: 'error',
              el: dom.$(this).parent().html()
            };
          }
        });
      }
    })
  };
}());
