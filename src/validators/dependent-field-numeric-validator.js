ko.validators.dependentFieldNumericValidator = function (otherFieldId, message, comparator) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      var otherField, otherFieldValue, valueNumeric, otherFieldValueNumeric, result;

      otherField = document.getElementById(otherFieldId);
      otherFieldValue = otherField.value;

      if (!utils.isInteger(otherFieldValue)) {
        return { isValid: true, message: '' };
      }

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      result = {};
      result.isValid = utils.isInteger(valueNumeric) && comparator(valueNumeric, otherFieldValueNumeric);
      result.message = message;

      return result;
    }
  };
};
