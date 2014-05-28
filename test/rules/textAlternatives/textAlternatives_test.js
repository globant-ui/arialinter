'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('textAlternatives');

exports['textAlternatives rules'] = {

  'DoesntHaveAltAttr': function(test) {
    var rule = RuleRegistry.getRule('validAltText');

    jsdom.env('test/rules/textAlternatives/doesntHaveAltAttr.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because images dont have alt attribute');
      test.done();
    });
  }

}