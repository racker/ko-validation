ko.validators.greaterThanOrEqualToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  return {
    validate: function (value) {
      var utils, otherField, otherFieldValue, valueNumeric, otherFieldValueNumeric, result;

      utils = ko.validators.utilities;

      otherField = document.getElementById(otherFieldId);
      otherFieldValue = utils.getValue(otherField);

      if (!utils.isInteger(otherFieldValue)) {
        return { isValid: true, message: '' };
      }

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      result = {};
      result.isValid = utils.isInteger(value) && valueNumeric >= otherFieldValueNumeric;
      result.message = result.isValid ? '' : utils.buildString(
        '{$field} must be greater than or equal to {$otherField}',
        { 'field': fieldName, 'otherField': otherFieldName }
      );

      return result;
    }
  };
};

