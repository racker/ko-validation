module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'lib/jquery-2.0.3.min.js',
      'lib/**/*.js',
      'dist/*.min.js',
      'spec/matchers.js',
      'spec/**/*.js'
    ]
  });
};

