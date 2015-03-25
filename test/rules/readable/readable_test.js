'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom'),
    $ = require('jquery');

RuleRegistry.loadRules('readable');

exports['readable rules'] = {

  'DoesntHaveLangAttr': function(test) {
    var rule = RuleRegistry.getRule('htmlLang');
    jsdom.env('test/rules/readable/doesntHaveLangAttr.html', function (err, window) {
      window.$ = $(window);
      test.notEqual(rule.applyRule(window), true, 'Should fail because html tag doesnt have lang attribute');
      test.done();
    });
  }

}