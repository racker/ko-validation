module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      options: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
      },
      all: {
        background: true,
        browsers: ['Chrome', 'Firefox']
      }
    },
    watch: {
      tests: {
        files: ['spec/**/*.js', 'src/**/*.js'],
        task: ['karma:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['karma']);
};
