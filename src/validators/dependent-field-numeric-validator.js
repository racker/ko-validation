ko.validators.dependentFieldNumericValidator = function (otherFieldId, message, callback) {
  return {
    validate: function (value) {
      var utils, otherField, otherFieldValue, valueNumeric, otherFieldValueNumeric, result;

      utils = ko.validators.utilities;

      otherField = document.getElementById(otherFieldId);
      otherFieldValue = otherField.value;

      if (!utils.isInteger(otherFieldValue)) {
        return { isValid: true, message: '' };
      }

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      result = {};
      result.isValid = utils.isInteger(valueNumeric) && callback(valueNumeric, otherFieldValueNumeric);
      result.message = message;

      return result;
    }
  };
};
