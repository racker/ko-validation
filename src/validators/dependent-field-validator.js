ko.validators.compareWithDelayedValueValidator = function (delayedValue, comparator, message) {
  return ko.validators.customValidator(
    ko.validators.utilities.validateWithMessage(
      function (value) {
        return comparator(value, delayedValue());
      },
      message
    )
  );
};

ko.validators.dependentFieldValidator = function (otherFieldId, message, comparator) {
  var delayedOtherFieldValue = utils.delayedValueByElementId(otherFieldId);

  return ko.validators.compareWithDelayedValueValidator(
    delayedOtherFieldValue, comparator, message
  );
};
