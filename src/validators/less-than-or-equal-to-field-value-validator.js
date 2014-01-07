ko.validators.lessThanOrEqualToFieldValueValidator = function (otherFieldId, message) {
  return ko.validators.dependentFieldNumericValidator(
    otherFieldId,
    function (value, otherFieldValue) {
      return value <= otherFieldValue;
    },
    message
  );
};

