ko.validators.integerValidator = function (message) {
  return ko.validators.validatorWithMessage(
    ko.validators.utilities.isInteger,
    message
  );
};

ko.validators.integerValueValidator = function (operation, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      if (ko.validators.utilities.isInteger(value)) {
        return operation(parseInt(value, 10));
      }
      return !value;
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

