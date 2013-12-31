ko.validators.dependentFieldValidator = function (otherFieldId, message, comparator) {
  var delayedOtherFieldValue = ko.validators.utilities.delayedValueByElementId(otherFieldId);

  return ko.validators.compareWithDelayedValueValidator(
    delayedOtherFieldValue, comparator, message
  );
};
