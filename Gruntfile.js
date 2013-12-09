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
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'src/namespaces.js',
          'src/validators/**/*.js',
          'src/ko-validation.js',
          'src/validators-registry.js'
        ],
        dest: 'dist/ko-validation.js'
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['ko']
        }
      },
      dist: {
        files: {
          'dist/ko-validation.min.js': [ 'dist/ko-validation.js' ]
        }
      }
    },
    watch: {
      tests: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['karma:all:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['karma:all', 'watch']);
  grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);
};
