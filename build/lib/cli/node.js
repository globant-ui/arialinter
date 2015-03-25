#!/usr/bin/env node

(function() {
  'use strict';

  var AriaLinter = require('../AriaLinter.js');
  var async = require('async');
  var program = require('commander');
  var colors = require('colors');

  var printElement;

  var executeLinter = function(files, options) {
    async.each(files, function(file, callback) {
      AriaLinter.initialize(file, function() {
        console.log(file);
        if (AriaLinter.evaluate(options)) {
          callback();
        } else {
          console.log(AriaLinter.getReport('text', file, options));
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
    .option('-e, --printElement', 'Print the parent element as part of the error')
    .parse(process.argv);

  if (program.rawArgs.length >= 3 && program.args.length >= 0) {
    if (program.rules) {
      var rules;
      var len;

      AriaLinter.initRules();
      rules = AriaLinter.getRules();
      len = rules.length;

      for (var x = 0; x < len; x++) {
        console.log('Rule: ' + rules[x]);
      }
    } else {
      printElement = program.printElement || false;

      if ((program.templates) && (program.level)) {
        executeLinter(program.args, {
          level: program.level,
          template: true,
          printElement: printElement
        });
      } else {
        if (program.templates) {
          executeLinter(program.args, {
            template: true,
            printElement: printElement
          });
        }
        else {
          if (program.level) {
            executeLinter(program.args, {
              level: program.level,
              printElement: printElement
            });
          }
          else {
            executeLinter(program.args, {
              printElement: printElement
            });
          }
        }
      }
    }
  } else {
    program.help();
  }
}());
