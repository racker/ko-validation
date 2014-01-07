ko.validators.integerValidator = function (message) {
  return ko.validators.validatorWithMessage(
    ko.validators.utilities.isInteger,
    message
  );
};

ko.validators.customIntegerValidator = function (operation, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      return ko.validators.utilities.isInteger(value) && operation(parseInt(value, 10));
    },
    message
  );
};

ko.validators.greaterThanValueValidator = function (minimum, message) {
  return ko.validators.customIntegerValidator(
    ko.func.operators.greaterThan(minimum),
    message
  );
};

ko.validators.rangeValidator = function (min, max, message) {
  var op, utils;
  op = ko.func.operators;
  utils = ko.validators.utilities;

  return ko.validators.customIntegerValidator(
    op.range(min, max),
    message
  );
};

