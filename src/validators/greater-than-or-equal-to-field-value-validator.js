ko.validators.greaterThanOrEqualToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  return {
    validate: function (value) {
      var utils = ko.validators.utilities;

      var otherField = document.getElementById(otherFieldId);
      var otherFieldValue = utils.getValue(otherField);

      if (!utils.isInteger(otherFieldValue)) {
        return { isValid: true, message: '' };
      }

      var valueNumeric = parseInt(value, 10);
      var otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      var result = {};
      result.isValid = utils.isInteger(value) && valueNumeric >= otherFieldValueNumeric;
      result.message = result.isValid ? '' : ko.validation.config.i18n(
        '{$field} must be greater than or equal to {$otherField}',
        { 'field': fieldName, 'otherField': otherFieldName }
      );

      return result;
    }
  };
};

