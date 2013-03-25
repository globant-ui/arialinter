module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    nodeunit: {
      files: ['test/**/*_test.js']
    },
    arialinter: {
      files: [
        '<!doctype html><html lang="en"><head><title>titulo test</title></head><body style="background-color: white;"> <h1 style="color: black;">hola</h1><img src="asdf.jpg" alt="woop" /> </body> </html>'
      ]
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Register nodeunit task.
  grunt.registerTask('test', ['nodeunit']);

  // Default task.
  grunt.registerTask('default', ['arialinter']);

};
