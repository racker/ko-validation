ko.validators.operators = (function () {
  var self = {};

  self.and = function (funOne, funTwo) {
    return function (value) {
      return funOne(value) && funTwo(value);
    };
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
    return self.and(
      self.greaterThanOrEqualTo(minimum),
      self.lessThanOrEqualTo(maximum)
    );
  };

  return self;
}) ();
