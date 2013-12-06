module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
      },
      all: {
        reporters: 'dots',
        background: true,
        browsers: ['Chrome', 'Firefox']
      },
      ci: {
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    watch: {
      tests: {
        files: ['spec/**/*.js', 'src/**/*.js'],
        tasks: ['karma:all:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['karma:all', 'watch']);
};
