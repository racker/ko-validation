ko.validators.requiredValidator = function (message) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      if (utils.isArray(value)) {
        return value.length > 0;
      }
      if (utils.isNumber(value)) {
        return true;
      }
      return !!value;
    },
    message
  );
};

