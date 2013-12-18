module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'lib/jquery-2.0.3.min.js',
      'lib/**/*.js',
      'src/namespaces.js',
      'src/ko-validation.js',
      'src/validators/**/*.js',
      'src/validators-registry.js',
      'src/**/*.js',
      'spec/matchers.js',
      'spec/**/*.js'
    ]
  });
};

