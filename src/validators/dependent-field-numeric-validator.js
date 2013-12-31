ko.validators.dependentFieldNumericValidator = function (otherFieldId, message, comparator) {
  var utils, delayedOtherFieldValue;
  utils = ko.validators.utilities;
  delayedOtherFieldValue = utils.delayedValueByElementId(otherFieldId);

  return ko.validators.customValidator(
    utils.validateWithMessage(
      function (value) {
        var otherFieldValue, valueNumeric, otherFieldValueNumeric;

        otherFieldValue = delayedOtherFieldValue();
        if (!utils.isInteger(otherFieldValue)) {
          return true;
        }

        valueNumeric = parseInt(value, 10);
        otherFieldValueNumeric = parseInt(otherFieldValue, 10);

        return utils.isInteger(value) && comparator(valueNumeric, otherFieldValueNumeric);
      },
      message
    )
  );
};
