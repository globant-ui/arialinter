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

    var executeLinter = function(files, done, options) {
      async.each(files, function(uri, callback) {
        linter.initialize(uri, function() {
          x++;

          if (linter.evaluate(options)){
            grunt.log.write('File ' + x + ' markup seems to be valid.\n'.info);
            callback();
          } else {
            grunt.log.write('File ' + x + ' markup doesnt seem to be valid.\n'.error);
            callback();
          }
        });
      }, function() {
        done();
      });
    };


    if ((this.options().templates) && (this.options().levels)) {
      console.log('for templates and with level');
      executeLinter(this.filesSrc, done, {
        level: this.options().levels,
        template: true
      });
    } else {
      if (this.options().templates) {
        console.log('only for templates');
        executeLinter(this.filesSrc, done, {
          template: true
        });
      }
      else {
        if (this.options().levels) {
          console.log('only for level');
          executeLinter(this.filesSrc, done, {
            level: this.options().levels
          });
        }
        else {
          console.log('Applying default linter..');
          executeLinter(this.filesSrc, done);
        }
      }
    }
  });
};
