ko.validators.lengthRangeValidator = function (minLength, maxLength, message) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      var len;

      len = value.toString().trim().length;
      return len >= minLength && len <= maxLength;
    },
    message
  );
};

