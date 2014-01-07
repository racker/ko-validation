ko.validators.maxLengthValidator = function (length, message) {
  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value.toString().trim().length <= length;
    },
    message
  );
};

