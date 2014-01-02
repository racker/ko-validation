ko.validators.customValidator = function (validationFn, context) {
  return { validate: validationFn.bind(context) };
};

ko.validators.customValidatorWithMessage = function (validationFn, message) {
  return ko.validators.customValidator(
    ko.validators.utilities.validateWithMessage(
      validationFn,
      message
    )
  );
};
