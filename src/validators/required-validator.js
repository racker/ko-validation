ko.validators.requiredValidator = function (fieldName, customMessage) {
  return {
    validate: function (value) {
      var result = {};

      result.isValid = ko.validators.utilities.isArray(value) ?
        value.length > 0 :
        !!value;

      result.message = result.isValid ? '' : customMessage || ko.validation.config.i18n(
        '{$fieldName} is required.',
        {'fieldName': fieldName}
      );

      return result;
    }
  };
};

