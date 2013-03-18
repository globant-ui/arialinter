/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */


var ArialLinter = require('../lib/arialinter.js').ArialLinter;
var async = require('async');


module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('arialinter', 'ArialLinter provides a simple accesibility linter for HTML documents.', function() {

    // Tell grunt this task is asynchronous.
    var done = this.async();

    var linter = new ArialLinter();
    var x = 0;

    async.each(this.data, function(uri, callback) {
      linter.initialize(uri, function() {
        x++;

        if (linter.evaluate()){
          grunt.log.write('The HTML of the file ' + x + ' seems to be valid according the WCAG 2.0 spec.\n');
          callback();
        } else {
          grunt.warn('The HTML of the file ' + x + ' doenst seem to be valid according the WCAG 2.0 spec.\n');
          callback();
        }
      });
    }, function() {
        done();
    });
  });
};
