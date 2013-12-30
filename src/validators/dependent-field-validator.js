ko.validators.dependentFieldValidator = function (otherFieldId, message, comparator) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      var otherField, otherFieldValue, valueNumeric, otherFieldValueNumeric, result;

      otherField = document.getElementById(otherFieldId);
      otherFieldValue = otherField.value;

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      result = {};
      result.isValid = comparator(valueNumeric, otherFieldValueNumeric);
      result.message = message;

      return result;
    }
  };
};
