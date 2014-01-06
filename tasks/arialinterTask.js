/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */


var AriaLinter = require('../lib/arialinter.js').AriaLinter;
var async = require('async');
var colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});


module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('arialinter', 'AriaLinter provides a simple accesibility linter for HTML documents.', function() {

    // Tell grunt this task is asynchronous.
    var done = this.async();
    var linter = new AriaLinter();
    var x = 0;
    var hasErrors = false;

    var executeLinter = function(files, done, options) {
      async.each(files, function(uri, callback) {
        linter.initialize(uri, function() {
          x++;
          if (linter.evaluate(options)) {
            callback();
          } else {
            hasErrors = true;
            console.log(linter.getReport('text', uri));
            callback();
          }
        });
      }, function() {
        done(!hasErrors);
      });
    };

    var config = this.options();

    if (config.templates === true) {
      config.template = true;
      delete config.templates;
    }

    executeLinter(this.filesSrc, done, config);
  });
};
