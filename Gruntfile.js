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
        '<!doctype html><html lang="en"><head><title>titulo test</title></head><body style="background-color: white;"> <h1 style="color: black;">hola</h1><img src="asdf.jpg" alt="woop" /> <div class="entry"> <p>{{title}}</p> <h2>By {{author.name}}</h2> <div class="body">{{body}}</div></div> </body> </html>'
      ]
    },
    copy: {
      main: {
        files: [
          {src: ['lib/**'], dest: 'build/'}
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Register nodeunit task.
  grunt.registerTask('test', ['nodeunit']);

  // Register build task.
  grunt.registerTask('build', ['copy']);

  // Default task.
  grunt.registerTask('default', ['arialinter']);

};
