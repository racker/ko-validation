ko.validators.minLengthValidator = function (fieldName, length) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value.toString().trim().length >= length;
    },
    utils.buildString(
      '{$field} must contain at least {$len} characters.',
      { 'field' : fieldName, 'len' : length }
    )
  );
};

