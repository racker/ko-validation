ko.validators.dependentFieldValidator = function (otherFieldId, message, comparator) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      var otherField, otherFieldValue, result;

      otherField = document.getElementById(otherFieldId);
      otherFieldValue = otherField.value;

      result = {};
      result.isValid = comparator(value, otherFieldValue);
      result.message = message;

      return result;
    }
  };
};
