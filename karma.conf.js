module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'lib/**/*.js',
      'src/**/*.js',
      'spec/**/*.js'
    ]
  });
};

