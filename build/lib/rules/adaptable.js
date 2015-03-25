// Guideline 1.3 Adaptable
/*
  Missing rules:
    10, 11, 12
*/

(function() {
  'use strict';

  var Rule = require('../rule');

  module.exports = {
    tableHasSummary: new Rule({
      name:    'Data tables must use summary attribute',

      message: 'Please add the summary attribute to this table',

      ruleUrl: 'http://oaa-accessibility.org/rule/3/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        dom.$('table').each(function() {
          if (!dom.$(this).attr('summary')) {
            throw {
              reportType: 'error',
              el: dom.$(this).parent().html()
            };
          }
        });
      }
    }),

    tableMustHaveTh: new Rule({
      name:    'Data tables must use th elements',

      message: 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows',

      ruleUrl: 'http://oaa-accessibility.org/rule/4/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        function tableHasTh(currentTable) {
          var passed = false,
              rows = currentTable.rows,
              firstRowCells = rows[0].cells,
              cellContent,
              thColCount = 0,
              thRowCount = 0,
              row,
              col;
          if (firstRowCells.length > 1) {
            for (col = 0; col < firstRowCells.length; col++) {
              cellContent = firstRowCells[col].textContent.trim();
              if (firstRowCells[col].tagName.toLowerCase() === 'th' && cellContent !== '') {
               thColCount++;
              }
            }
            if (firstRowCells.length === thColCount) {
              passed = true;
            }
          }
          if (!passed) {
            if (rows.length > 1) {
              for (row = 0; row < rows.length; row++) {
                cellContent = rows[row].cells[0].textContent.trim();
                if (rows[row].cells[0] && rows[row].cells[0].tagName.toLowerCase() === 'th' &&
                    cellContent !== '') {
                  thRowCount++;
                }
              }
              if (rows.length == thRowCount) {
                passed = true;
              }
            }
            if (firstRowCells.length-1 === thColCount && rows.length-1 === thRowCount) {
              passed = true;
            }
          }
          return passed;
        }
        dom.$('table').each(function() {
          var currentTable = dom.$(this)[0];
          if(!tableHasTh(currentTable)) {
            throw {
              reportType: 'error',
              el: dom.$(this).parent().html()
            };
          }
        });
      }
    }),

    uniqueSummaryAttr: new Rule({
      name:    'Summary attribute content must be unique',

      message: 'The summary atribute from the tables should be unique',

      ruleUrl: 'http://oaa-accessibility.org/rule/5/',

      level: 'A',

      template: true,

      callback: function(dom, reporter) {
        var s = [];

        dom.$('table').each(function() {

          var e = dom.$(this).attr('summary');

          if (s.indexOf(e) === -1) {
            s.push(e);
          } else {
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
