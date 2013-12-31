ko.validators.regexValidator = function (message, regex) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(
    utils.validateWithMessage(regex.test.bind(regex), message)
  );
};
