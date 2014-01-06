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
    ko.func.operators.lessThanOrEqualTo(length),
    message
  );
};

ko.validators.minLengthValidator = function (length, message) {
  return ko.validators.lengthValidator(
    ko.func.operators.greaterThanOrEqualTo(length),
    message
  );
};
