#!/usr/bin/env node

var AriaLinter = require('../arialinter.js').AriaLinter;
var async = require('async');
var program = require('commander');
var linter = new AriaLinter();
var colors = require('colors');

var executeLinter = function(files, options) {
  'use strict';
  var x = 0;

  async.each(files, function(file, callback) {
    linter.initialize(file, function() {
      x++;

      if (linter.evaluate(options)){
        // console.log(('No accessibility errors found for file ' + file + '.\n').blue);
        callback();
      } else {
        // console.log((linter.getErrorsFound() + ' errors were found in file ' + file + '.\n').red);
        console.log(linter.getReport('text', file));
        callback();
      }
    });
  });
};

program
  .version('0.0.1')
  .usage('[options] <files ...>')
  .option('-r, --rules', 'List all the rules')
  .option('-l, --level <level>', 'Select the level of success criteria')
  .option('-t, --templates', 'Only executes the rules that apply for templates')
  .parse(process.argv);

if (program.rawArgs.length >= 3 && program.args.length >= 0) {
  if (program.rules) {
    var rules;
    var len;

    linter.initRules();
    rules = linter.getRules();
    len = rules.length;

    for (var x = 0; x < len; x++) {
      console.log('Rule: ' + rules[x]);
    }
  } else {
    if ((program.templates) && (program.level)) {
      executeLinter(program.args, {
        level: program.level,
        template: true
      });
    } else {
      if (program.templates) {
        executeLinter(program.args, {
          template: true
        });
      }
      else {
        if (program.level) {
          executeLinter(program.args, {
            level: program.level
          });
        }
        else {
          executeLinter(program.args);
        }
      }
    }
  }
} else {
  program.help();
}
