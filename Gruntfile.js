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
        tasks: ['karma:all:run']
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('clean', 'Clears old files on the dist folder.', function () {
    var done = this.async();
    var exec = require('child_process').exec

    exec('rm -rf ' + __dirname + '/dist/', function (err, stdout, stderr) {
      err && console.log(err);
      stdout && console.log('stdout:', stdout);
      stderr && console.log('stderr:', stderr);
      done(!err);
    });
  });

  grunt.registerTask('default', ['karma:all', 'watch']);
  grunt.registerTask('dist', ['clean', 'concat:dist', 'uglify:dist']);
};
