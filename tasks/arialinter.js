/*
 * grunt-arialinter
 * https://github.com/globant-ui/arialinter
 *
 * Copyright (c) 2012 Globant UI Developers
 * Licensed under the MIT license.
 */

var arialinter = require('../lib/arialinter.js');
var async = require('async');


module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================


  grunt.registerMultiTask('arialinter', 'ArialLinter provides a simple accesibility linter for HTML documents.', function() {

    // Tell grunt this task is asynchronous.
    var done = this.async();

    var linter = new arialinter.ALinter();
    var x = 0;

    async.each(this.data, function(uri, callback){

      linter.initialize(uri, function(){
        if (linter.evaluate()){
          grunt.log.write('The HTML of the file ' + ++x + ' seems to be valid according the WCAG 2.0 spec.\n');
          callback();
        }
        else{
          grunt.warn('The HTML of the file ' + ++x + ' doenst seem to be valid according the WCAG 2.0 spec.\n');
          callback();
        }
      });
    }, function(err){
        if (!err){
          done();
        }
    });

  });

};
