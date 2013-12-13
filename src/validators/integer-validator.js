ko.validators.integerValidator = function (fieldName) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidator(
    utils.validateWithMessage(
      utils.isInteger,
      utils.buildString(
        '{$field} must be a number.',
        { 'field': fieldName }
      )
    )
  );
};

