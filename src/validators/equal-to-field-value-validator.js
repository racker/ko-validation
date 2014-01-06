ko.validators.equalToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value === utils.getValueByElementId(otherFieldId);
    },
    utils.buildString(
      '{$field} must be equal to {$otherField}.',
      { 'field': fieldName, 'otherField': otherFieldName }
    )
  );
};
