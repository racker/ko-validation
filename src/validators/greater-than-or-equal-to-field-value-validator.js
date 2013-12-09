ko.validators.greaterThanOrEqualToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  var dependentFieldNumericValidator;

  dependentFieldNumericValidator = ko.validators.dependentFieldNumericValidator(
    otherFieldId,
    ko.validators.utilities.buildString(
      '{$field} must be greater than or equal to {$otherField}',
      { 'field': fieldName, 'otherField': otherFieldName }
    ),
    function (value, otherFieldValue) {
      return value >= otherFieldValue;
    }
  );

  return {
    validate: function (value) {
      return dependentFieldNumericValidator.validate(value);
    }
  };
};

