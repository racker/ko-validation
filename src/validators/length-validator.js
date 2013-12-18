ko.validators.lengthValidator = function (fieldName, length) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(
    utils.validateWithMessage(
      function (value) {
        return value.toString().trim().length <= length;
      },
      utils.buildString(
        '{$field} cannot be longer than {$len} characters.',
        { 'field' : fieldName, 'len' : length }
      )
    )
  );
};

