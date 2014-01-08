ko.func.operators = (function () {
  var self = {};

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
    return function (value) {
      return self.greaterThanOrEqualTo(minimum)(value)
          && self.lessThanOrEqualTo(maximum)(value);
    }
  };

  return self;
}) ();
