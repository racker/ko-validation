ko.validators.dependentFieldNumericValidator = function (otherFieldId, message, comparator) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      var otherFieldValue, valueNumeric, otherFieldValueNumeric;

      otherFieldValue = utils.getValueByElementId(otherFieldId);
      if (!utils.isInteger(otherFieldValue)) {
        return true;
      }

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      return utils.isInteger(value) && comparator(valueNumeric, otherFieldValueNumeric);
    },
    message
  );
};
