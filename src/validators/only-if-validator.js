ko.validators.onlyIfValidator = function (requisite) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(function () {
    return { isValid: true };
  });
};

