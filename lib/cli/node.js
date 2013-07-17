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
        console.log(('No accessibility errors found for file ' + file + '.\n').blue);
        callback();
      } else {
        console.log((linter.getErrorsFound() + ' errors were found in file ' + file + '.\n').red);
        console.log(linter.getReport('text'));
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
    console.log('Displaying rules..');
    console.log('');
    linter.initRules();
    var rules = linter.getRules();
    var len = rules.length;

    for (var x = 0; x < len; x++) {
      console.log('Rule: ' + rules[x]);
    }
  } else {
    if ((program.templates) && (program.level)) {
      console.log('for templates and with level');
      executeLinter(program.args, {
        level: program.level,
        template: true
      });
    } else {
      if (program.templates) {
        console.log('only for templates');
        executeLinter(program.args, {
          template: true
        });
      }
      else {
        if (program.level) {
          console.log('only for level');
          executeLinter(program.args, {
            level: program.level
          });
        }
        else {
          console.log('Applying default linter..');
          executeLinter(program.args);
        }
      }
    }
  }
} else {
  program.help();
}
