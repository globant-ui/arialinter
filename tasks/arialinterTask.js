/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */


var ArialLinter = require('../lib/arialinter.js').ArialLinter;
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

  grunt.registerMultiTask('arialinter', 'ArialLinter provides a simple accesibility linter for HTML documents.', function() {

    // Tell grunt this task is asynchronous.
    var done = this.async();

    var linter = new ArialLinter();
    var x = 0;

    var executeLinter = function(files, done, options) {
      async.each(files, function(uri, callback) {
        linter.initialize(uri, function() {
          x++;

          if (linter.evaluate()){
            grunt.log.write('The HTML of the file ' + x + ' seems to be valid according the WCAG 2.0 spec.\n'.info);
            callback();
          } else {
            grunt.log.write('The HTML of the file ' + x + ' doenst seem to be valid according the WCAG 2.0 spec.\n'.error);
            callback();
          }
        });
      }, function() {
          done();
      });
    };


    if ((this.options().templates) && (this.options().levels)) {
        console.log('for templates and with level');
        executeLinter(this.data, done, {
          level: this.options().levels,
          template: true
        });
      } else {
        if (this.options().templates) {
          console.log('only for templates');
          executeLinter(this.data, done, {
            template: true
          });
        }
        else {
          if (this.options().levels) {
            console.log('only for level');
            executeLinter(this.data, done, {
              level: this.options().levels
            });
          }
          else {
            console.log('Applying default linter..');
            executeLinter(this.data, done);
          }
        }
    }

  });
};
