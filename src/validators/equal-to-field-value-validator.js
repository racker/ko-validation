ko.validators.equalToFieldValueValidator = function (otherFieldName, otherFieldId, message) {
  var utils = ko.validators.utilities;

  return ko.validators.customValidatorWithMessage(
    function (value) {
      return value === utils.getValueByElementId(otherFieldId);
    },
    message
  );
};
