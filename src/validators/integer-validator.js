ko.validators.integerValidator = function (fieldName) {
  var message = ko.validators.utilities.buildString(
    '{$field} must be a number.',
    { 'field': fieldName }
  );

  return ko.validators.customValidator(function (value) {
    return ko.validators.utilities.isInteger(value) || message;
  });
};

