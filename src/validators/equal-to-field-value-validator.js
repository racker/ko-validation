ko.validators.equalToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId, validationText) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value === utils.getValueByElementId(otherFieldId);
    },
    validationText || utils.buildString(
      '{$field} must be equal to {$otherField}.',
      { 'field': fieldName, 'otherField': otherFieldName }
    )
  );
};
