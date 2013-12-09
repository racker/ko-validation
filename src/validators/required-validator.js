ko.validators.requiredValidator = function (fieldName, customMessage) {
  return {
    validate: function (value) {
      var result;
      result = {};

      if (ko.validators.utilities.isArray(value)) {
        result.isValid = value.length > 0;
      } else {
        result.isValid = !!value;
      }

      result.message = result.isValid ? '' : customMessage || ko.validation.config.i18n(
        '{$fieldName} is required.',
        {'fieldName': fieldName}
      );

      return result;
    }
  };
};

