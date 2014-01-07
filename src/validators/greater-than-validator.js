ko.validators.greaterThanValueValidator = function (minimum, message) {
  return ko.validators.customValidatorWithMessage(
    function (value) {
      return parseInt(value, 10) > minimum;
    },
    message
  );
};

