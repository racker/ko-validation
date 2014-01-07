ko.validators.rangeValidator = function (min, max, message) {
  return ko.validators.customValidatorWithMessage(
    function (value) {
      var numericValue, isInteger, isWithinRange, result;

      numericValue = parseInt(value, 10);
      isInteger = ko.validators.utilities.isInteger(value);
      isWithinRange = numericValue >= min && numericValue <= max;

      return isInteger && isWithinRange;
    },
    message
  );
};

