'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('element');

exports['element rules'] = {

  'HaveIElement': function(test) {
    var uri = '<!doctype html><html lang="en"><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <i>asdf</i> </body> </html>',
        rule = RuleRegistry.getRule('doNotUseElementI');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because it has i element');
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

}