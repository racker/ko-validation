ko.validators.integerValidator = function (message) {
  return ko.validators.customValidatorWithMessage(
    ko.validators.utilities.isInteger,
    message
  );
};

