ko.validators.equalToFieldValueValidator = function (fieldName, otherFieldName, otherFieldId) {
  var utils, delayedOtherFieldValue;
  utils = ko.validators.utilities;
  delayedOtherFieldValue = utils.delayedValueByElementId(otherFieldId);

  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value === delayedOtherFieldValue();
    },
    utils.buildString(
      '{$field} must be equal to {$otherField}.',
      { 'field': fieldName, 'otherField': otherFieldName }
    )
  );
};
