module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'lib/jquery-2.0.3.min.js',
      'lib/**/*.js',
      'src/namespaces.js',
      'src/**/*.js',
      'spec/**/*.js'
    ]
  });
};

