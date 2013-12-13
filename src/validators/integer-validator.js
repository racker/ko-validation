ko.validators.integerValidator = function (fieldName) {
  var message = ko.validators.utilities.buildString(
    '{$field} must be a number.',
    { 'field': fieldName }
  );

  function isInteger(text) {
    return /^-?[0-9]*$/.test(text);
  }

  return ko.validators.customValidator(function (value) {
    var isValid;
    isValid = !isNaN(parseInt(value, 10)) && isInteger(value);
    return isValid || message;
  });
};

