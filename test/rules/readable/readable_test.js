'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('readable');

exports['readable rules'] = {

  'DoesntHaveLangAttr': function(test) {
    var rule = RuleRegistry.getRule('htmlLang');
    jsdom.env('test/rules/readable/doesntHaveLangAttr.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because html tag doesnt have lang attribute');
      test.done();
    });
  }

}