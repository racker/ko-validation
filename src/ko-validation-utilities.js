ko.validation.utilities = (function () {
  var self = {};

  self.isInteger = function (num) {
    return isFinite(num) && num % 1 == 0;
  };

  self.isEmptyString = function (value) {
    return /^[\s\xa0]*$/.test(value == null ? '' : String(value));
  };

  return self;
}) ();
