ko.validators.delayedValueValidator = function (delayedValue, message, comparator) {
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
  var delayedOtherFieldValue = ko.validators.utilities.delayedValueByElementId(otherFieldId);

  return ko.validators.delayedValueValidator(delayedOtherFieldValue, message, comparator);
};
