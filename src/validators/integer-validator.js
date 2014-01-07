ko.validators.integerValidator = function (message) {
  return ko.validators.validatorWithMessage(
    ko.validators.utilities.isInteger,
    message
  );
};

