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
