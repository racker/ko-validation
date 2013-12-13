ko.validators.integerValidator = function (fieldName) {
  return ko.validators.customValidator(
    ko.validators.utilities.isInteger,
    ko.validators.utilities.buildString(
      '{$field} must be a number.',
      { 'field': fieldName }
    )
  );
};

