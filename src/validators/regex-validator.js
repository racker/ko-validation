ko.validators.regexValidator = function (regex, message) {
  return ko.validators.validatorWithMessage(
    regex.test.bind(regex),
    message
  );
};

