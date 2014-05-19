'use strict';

var RuleRegistry = require('../../../lib/ruleregistry'),
    jsdom = require('jsdom');

RuleRegistry.loadRules('textAlternatives');

exports['textAlternatives rules'] = {

  'DoesntHaveAltAttr': function(test) {
    var uri = '<!doctype html><html lang="en"><head><title>test1 mundo</title></head><body style="background-color: white;"> <h1 style="color: black;">hola mundo</h1><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3"/><img src="http://dummyimage.com/600x400.gif/292929/e3e3e3" alt="asd" /></body> </html>',
        rule = RuleRegistry.getRule('validAltText');

    jsdom.env(uri, ['http://code.jquery.com/jquery.js'], function (err, window) {
      test.notEqual(rule.applyRule(window), true, 'Should fail because images dont have alt attribute');
      test.done();
    });
  }

}