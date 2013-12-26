ko.validators.requiredValidator = function (fieldName, customMessage) {
  var utils = ko.validators.utilities;
  customMessage = customMessage || utils.buildString(
    '{$fieldName} is required.',
    {'fieldName': fieldName}
  );

  return ko.validators.customValidator(
    utils.validateWithMessage(
      function (value) {
        if (utils.isArray(value)) {
          return value.length > 0;
        }
        if (utils.isNumber(value)) {
          return true;
        }
        return !!value;
      },
      customMessage
    )
  );
};

