ko.validators.lengthValidator = function (operation, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      if (ko.validators.utilities.isDefinedAndNotNull(value)) {
        return operation(value.toString().trim().length);
      }
      return true;
    },
    message
  );
};

ko.validators.maxLengthValidator = function (length, message) {
  return ko.validators.lengthValidator(
    ko.func.operators.lessThanOrEqualTo(length),
    message
  );
};
