ko.validation.testing = {};
ko.validation.testing.matchers = {
  toBeValid: function () {
    return this.actual.isValid();
  }
};

beforeEach(function () {
  this.addMatchers(ko.validation.testing.matchers);
});
