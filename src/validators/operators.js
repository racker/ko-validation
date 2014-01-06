ko.validators.operators = (function () {
  var self = {};

  var callWith = function (value) {
    return function (fn) {
      return fn(value);
    };
  };

  self.and = function (a, b) {
    return a && b;
  };

  self.onAllTrue = function (predicates) {
    return function (value) {
      return predicates.map(callWith(value)).reduce(self.and, true);
    }
  };

  self.strictEquals = function (other) {
    return function (value) {
      return value === other;
    };
  };

  self.greaterThan = function (minimum) {
    return function (value) {
      return value > minimum;
    };
  };

  self.greaterThanOrEqualTo = function (minimum) {
    return function (value) {
      return value >= minimum;
    };
  };

  self.lessThan = function (minimum) {
    return function (value) {
      return value < minimum;
    };
  };

  self.lessThanOrEqualTo = function (maximum) {
    return function (value) {
      return value <= maximum;
    };
  };

  self.range = function (minimum, maximum) {
    return self.onAllTrue([
      self.greaterThanOrEqualTo(minimum),
      self.lessThanOrEqualTo(maximum)
    ]);
  };

  return self;
}) ();
