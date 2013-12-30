ko.validators.dependentFieldNumericValidator = function (otherFieldId, message, comparator) {
  var utils = ko.validators.utilities;

  return ko.validators.dependentFieldValidator(otherFieldId, message, function (value, otherFieldValue) {
    var otherField, otherFieldValue, valueNumeric, otherFieldValueNumeric, result;

    if (!utils.isInteger(otherFieldValue)) {
      return true;
    }

    valueNumeric = parseInt(value, 10);
    otherFieldValueNumeric = parseInt(otherFieldValue, 10);

    return utils.isInteger(value) && comparator(valueNumeric, otherFieldValueNumeric);
  });
};
