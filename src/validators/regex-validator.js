ko.validators.regexValidator = function (regex, message) {
  return ko.validators.customValidatorWithMessage(
    regex.test.bind(regex),
    message
  );
};

