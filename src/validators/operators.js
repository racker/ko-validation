ko.validators.operators = (function () {
  var self = {};

  var callWith = function (value) {
    return function (fn) {
      return fn(value);
    };
  };
  var onAllTrue = function (predicates) {
    return function (value) {
      return predicates.map(callWith(value)).reduce(self.and, true);
    }
  };

  self.and = function (a, b) {
    return a && b;
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
    return onAllTrue([
      self.greaterThanOrEqualTo(minimum),
      self.lessThanOrEqualTo(maximum)
    ]);
  };

  return self;
}) ();
