ko.validators.lengthValidator = function (operation, message) {
  return ko.validators.customValidatorWithMessage(
    function (value) {
      return operation(value.toString().trim().length);
    },
    message
  );
};

ko.validators.maxLengthValidator = function (length, message) {
  return ko.validators.lengthValidator(
    ko.validators.operators.lessThanOrEqualTo(length),
    message
  );
};

ko.validators.minLengthValidator = function (length, message) {
  return ko.validators.lengthValidator(
    ko.validators.operators.greaterThanOrEqualTo(length),
    message
  );
};
