ko.validators.equalToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  return ko.validators.dependentFieldValidator(
    otherFieldId,
    ko.validators.utilities.buildString(
      '{$field} must be equal to {$otherField}.',
      { 'field': fieldName, 'otherField': otherFieldName }
    ),
    function (value, otherFieldValue) {
      return value === otherFieldValue;
    }
  );
};
