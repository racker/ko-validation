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
        configFile: 'karma-ci.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        background: false,
        browsers: ['Chrome']
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
          'src/operators.js',
          'src/ko-validation.js',
          'src/validators-registry.js'
        ],
        dest: 'dist/ko-validation-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['ko']
        },
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'dist/ko-validation-<%= pkg.version %>.min.js': [ 'dist/ko-validation-<%= pkg.version %>.js' ]
        }
      }
    },
    watch: {
      tests: {
        files: ['src/**/*.js', 'spec/**/*.js'],
        tasks: ['karma:all:run', 'jslint:all']
      }
    },
    clean: ['dist/**/*.*'],
    jslint: {
      all: {
        src: ['src/**/*.js', 'spec/**/*.js'],
        directives: {
          browser: true,
          indent: 2,
          sloppy: true,
          nomen: true,
          plusplus: true,
          predef: [ 'ko', 'jasmine', 'expect', 'describe', 'it', 'spyOn', 'beforeEach', 'afterEach', 'jQuery', '$', 'setFixtures' ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-jslint')
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['karma:all', 'watch']);
  grunt.registerTask('ci', ['jslint:all', 'dist', 'karma:ci']);
  grunt.registerTask('dist', ['clean', 'concat:dist', 'uglify:dist']);
};
