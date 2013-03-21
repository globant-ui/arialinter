var program = require('commander');

program
  .version('0.0.1')
  .usage('[options] <files ...>')
  .option('-r, --rules', 'List all the rules')
  .option('-R, --recursive', 'Scan for html files recursively')
  .parse(process.argv);

if (program.rawArgs.length >= 3 && program.args.length >= 0) {
  if (program.recursive) {
      console.log('recursive search');
      console.log(program.args);
  } else {
    if (program.rules) {
      console.log('Display rules..');
      console.log(program.args);
    } else {
      console.log('Process with no parametters..');
      console.log(program.args);
    }
  }
} else {
  program.help();
}