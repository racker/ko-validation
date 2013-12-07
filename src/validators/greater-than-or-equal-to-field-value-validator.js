ko.validators.greaterThanOrEqualToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  return {
    validate: function (value) {
      var otherField = document.getElementById(otherFieldId);
      var otherFieldValue = otherField.value;
      var otherFieldIsInteger = ko.validation.utilities.isInteger(otherFieldValue);
      var otherFieldIsEmpty = ko.validation.utilities.isEmptyString(otherFieldValue);

      if (otherFieldIsEmpty || !otherFieldIsInteger) {
        return { isValid: true, message: '' };
      }

      var valueNumeric = parseInt(value, 10);
      var otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      var result = {};
      result.isValid = ko.validation.utilities.isInteger(value) && valueNumeric >= otherFieldValueNumeric;
      result.message = result.isValid ? '' : ko.validation.config.i18n(
        '{$field} must be greater than or equal to {$otherField}',
        { 'field': fieldName, 'otherField': otherFieldName }
      );

      return result;
    }
  };
};

