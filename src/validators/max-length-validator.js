ko.validators.maxLengthValidator = function (length, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      return value.toString().trim().length <= length;
    },
    message
  );
};

