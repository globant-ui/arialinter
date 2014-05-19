'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('readable');

exports['readable rules'] = {

  'DoesntHaveLangAttr': function(test) {
    var uri = '<!doctype html><html><head><title>test hola</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1> <i>asdf</i> </body> </html>',
        rule = RuleRegistry.getRule('htmlLang');
    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because html tag doesnt have lang attribute');
      test.done();
    });
  }

}