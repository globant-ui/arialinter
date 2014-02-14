/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */

(function() {
  'use strict';

  var AriaLinter = require('../lib/arialinter.js');
  var async = require('async');
  var colors = require('colors');

  module.exports = function(grunt) {

    var taskDescription = 'AriaLinter provides a simple accesibility';
    taskDescription += ' linter for HTML documents.';

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

    grunt.registerMultiTask('arialinter', taskDescription, function() {
      var done = this.async();
      var x = 0;
      var hasErrors = false;

      var executeLinter = function(files, done, options) {
        async.each(files, function(uri, callback) {
          AriaLinter.initialize(uri, function() {
            x++;
            if (AriaLinter.evaluate(options)) {
              callback();
            } else {
              hasErrors = true;
              console.log(AriaLinter.getReport('text', uri));
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
}());
