ko.validators.regexValidator = function (regex, message) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(
    utils.validateWithMessage(regex.test.bind(regex), message)
  );
};
