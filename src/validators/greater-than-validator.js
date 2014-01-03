ko.validators.greaterThanValueValidator = function (fieldName, minimum) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      var numericValue, isValid;

      numericValue = parseInt(value, 10);
      isValid = numericValue > minimum;

      return isValid;
    },
    utils.buildString(
      '{$field} must be greater than {$minimum}.',
      { 'field': fieldName, 'minimum': minimum }
    )
  );
};

