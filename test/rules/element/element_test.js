'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('element');

exports['element rules'] = {

  'HaveIElement': function(test) {
    var rule = RuleRegistry.getRule('doNotUseElementI');

    jsdom.env('test/rules/element/HaveIElement.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has i element');
      test.done();
    });
  },

  'HaveBElement': function(test) {
    var rule = RuleRegistry.getRule('doNotUseElementB');

    jsdom.env('test/rules/element/HaveBElement.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has b element');
      test.done();
    });
  },

  'HaveUElement': function(test) {
    var rule = RuleRegistry.getRule('doNotUseElementU');

    jsdom.env('test/rules/element/HaveUElement.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has u element');
      test.done();
    });
  },

  'doNotUseElementBlink': function(test){
    var rule = RuleRegistry.getRule('doNotUseElementBlink');

    jsdom.env('test/rules/element/HaveBlinkElement.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has blink elements');
      test.done();
    });
  },

  'doNotUseElementMarquee': function(test){
      var rule = RuleRegistry.getRule('doNotUseElementMarquee');

    jsdom.env('test/rules/element/HaveMarqueeElement.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has marquee elements');
      test.done();
    });
  }

}