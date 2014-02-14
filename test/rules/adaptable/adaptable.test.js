'use strict';

var jsdom = require('jsdom');
var Adaptable = require('../../../lib/rules/adaptable.js');
var Reporter = require('../../../lib/reporter.js');

module.exports = {

    setUp: function(callback) {
      var that = this;
      this.dom = null;

      jsdom.env('test/rules/adaptable/tableTest.html', ['http://code.jquery.com/jquery.js'], function (err, window) {
        if (!err) {
          this.dom = window;
          callback();
        } else {
          console.log('Error on jsdom.env: ' + err);
          callback();
        }
      }.bind(this));
    },

    tearDown: function(callback) {
      callback();
    },

    testTableMustHaveHeaders: function(test) {

      Adaptable.tableMustHaveTh.applyRule(this.dom, Reporter);
      test.ok(Reporter.hasMessages(), 'there should be a reported error');
      test.done();
    }
};