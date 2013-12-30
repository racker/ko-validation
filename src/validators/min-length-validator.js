ko.validators.minLengthValidator = function (fieldName, length) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(
    utils.validateWithMessage(
      function (value) {
        return value.toString().trim().length >= length;
      },
      utils.buildString(
        '{$field} must be atleast {$len} characters long.',
        { 'field' : fieldName, 'len' : length }
      )
    )
  );
};

