'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom'),
    $ = require('jquery');

function checkForPresence(test, rule, file, msg){
  var rule = RuleRegistry.getRule(rule),
      config = {
        file: __dirname+'/'+file,
        done: function (err, window) {
          window.$ = $(window);
          test.notEqual(rule.applyRule(window), true, msg);
          test.done();
        }
      };
    jsdom.env(config);
}

RuleRegistry.loadRules('element');


exports['element rules'] = {

  'HaveIElement': function(test) {
    checkForPresence(test, 'doNotUseElementI', 'haveIElement.html', 'Should fail because it has i elements');
  },

  'HaveBElement': function(test) {
    checkForPresence(test, 'doNotUseElementB', 'haveBElement.html', 'Should fail because it has b elements');
  },

  'HaveUElement': function(test) {
    checkForPresence(test, 'doNotUseElementU', 'haveUElement.html', 'Should fail because it has u elements');
  },

  'doNotUseElementBlink': function(test){
    checkForPresence(test, 'doNotUseElementBlink', 'haveBlinkElement.html', 'Should fail because it has blink elements');
  },

  'doNotUseElementMarquee': function(test){
    checkForPresence(test, 'doNotUseElementMarquee', 'haveMarqueeElement.html', 'Should fail because it has marquee elements');
  }

}