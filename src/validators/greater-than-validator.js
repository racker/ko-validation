ko.validators.greaterThanValueValidator = function (fieldName, minimum) {
  return ko.validators.customValidator(function (value) {
    var numericValue, isValid;

    numericValue = parseInt(value, 10);
    isValid = numericValue > minimum;

    if (isValid) {
      return true;
    }
    return ko.validators.utilities.buildString(
      '{$field} must be greater than {$minimum}.',
      { 'field': fieldName, 'minimum': minimum }
    );
  });
};

