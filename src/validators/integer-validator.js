ko.validators.integerValidator = function (message) {
  return ko.validators.validatorWithMessage(
    ko.validators.utilities.isInteger,
    message
  );
};

ko.validators.integerValueValidator = function (operation, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      return ko.validators.utilities.isInteger(value) && operation(parseInt(value, 10));
    },
    message
  );
};

ko.validators.rangeValidator = function (min, max, message) {
  return ko.validators.integerValueValidator(
    ko.func.operators.range(min, max),
    message
  );
};

