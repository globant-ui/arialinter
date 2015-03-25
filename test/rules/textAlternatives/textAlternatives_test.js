'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom'),
    $ = require('jquery');

RuleRegistry.loadRules('textAlternatives');

exports['textAlternatives rules'] = {

  'DoesntHaveAltAttr': function(test) {
    var rule = RuleRegistry.getRule('validAltText');

    jsdom.env('test/rules/textAlternatives/doesntHaveAltAttr.html', function (err, window) {
      window.$ = $(window);
      test.notEqual(rule.applyRule(window), true, 'Should fail because images dont have alt attribute');
      test.done();
    });
  },

  'HaveEmptyAltAttr': function(test) {
    var rule = RuleRegistry.getRule('validAltText');

    jsdom.env('test/rules/textAlternatives/haveEmptyAltAttr.html', function (err, window) {
      window.$ = $(window);
      test.equal(rule.applyRule(window), true, 'Should pass because images have empty or non-empty alt attributes');
      test.done();
    });
  }

}
