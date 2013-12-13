ko.validators.lessThanOrEqualToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  return ko.validators.dependentFieldNumericValidator(
    otherFieldId,
    ko.validators.utilities.buildString(
      '{$field} must be less than or equal to {$otherField}',
      { 'field': fieldName, 'otherField': otherFieldName }
    ),
    function (value, otherFieldValue) {
      return value <= otherFieldValue;
    }
  );
};

