'use strict';

var RuleRegistry = require('../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('distinguishable');
RuleRegistry.loadRules('headingsAndLabels');
RuleRegistry.loadRules('inputAssistance');
RuleRegistry.loadRules('linkPurpose');
RuleRegistry.loadRules('navigable');
RuleRegistry.loadRules('pageTitled');
RuleRegistry.loadRules('readable');
RuleRegistry.loadRules('textAlternatives');
RuleRegistry.loadRules('element');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['General Rules'] = {

  setUp: function(done) {
    done();
  },

  'DoesntHaveAltAttr': function(test) {
    var uri = '<!doctype html><html lang="en"><head><title>test1 mundo</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3"/><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="asd" /></body> </html>',
        rule = RuleRegistry.getRule('validAltText');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because images dont have alt attribute');
      test.done();
    });
  },

  'HaveIElement': function(test) {
    var uri = '<!doctype html><html lang="en"><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <i>asdf</i> </body> </html>',
        rule = RuleRegistry.getRule('doNotUseElementI');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has i element');
      test.done();
    });
  },

  'DoesntHaveLangAttr': function(test) {
    var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <i>asdf</i> </body> </html>',
        rule = RuleRegistry.getRule('htmlLang');
    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because html tag doesnt have lang attribute');
      test.done();
    });
  },

  'HaveBElement': function(test) {
    var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <b>asdf</b> </body> </html>',
        rule = RuleRegistry.getRule('doNotUseElementB');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has b element');
      test.done();
    });
  },

  'HaveUElement': function(test) {
    var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <u>asdf</u> </body> </html>',
        rule = RuleRegistry.getRule('doNotUseElementU');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has u element');
      test.done();
    });
  },

  'doNotUseElementBlink': function(test){
    var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <marquee>asdf</marquee> <blink>wooop</blink> </body> </html>',
        rule = RuleRegistry.getRule('doNotUseElementBlink');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has marquee and blink elements');
      test.done();
    });
  },

  'doNotUseElementMarquee': function(test){
      var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <marquee>asdf</marquee> <blink>wooop</blink> </body> </html>',
          rule = RuleRegistry.getRule('doNotUseElementMarquee');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has marquee and blink elements');
      test.done();
    });
  }
};






