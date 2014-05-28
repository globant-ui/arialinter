'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('adaptable');

exports['adaptable rules'] = {

  'tableHasSummary': function(test) {
    var rule = RuleRegistry.getRule('tableHasSummary');

    jsdom.env('test/rules/adaptable/tableHasSummary.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.equal(rule.applyRule(window), true, 'Should fail because a table doenst have summary');
      test.done();
    });
  },

  'TablemustHaveThFailure': function(test) {
    var rule = RuleRegistry.getRule('tableMustHaveTh');

    jsdom.env('test/rules/adaptable/tableMustHaveThFailure.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because the table doesnt use th elements');
      test.done();
    });
  },

  'TablemustHaveThSuccess': function(test) {
    var rule = RuleRegistry.getRule('tableMustHaveTh');

    jsdom.env('test/rules/adaptable/tableMustHaveThSuccess.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.equal(rule.applyRule(window), true, 'Should pass because the tables use th elements properly');
      test.done();
    });
  }
}