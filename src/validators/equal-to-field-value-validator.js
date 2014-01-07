ko.validators.equalToFieldValueValidator = function (otherFieldId, message) {
  var utils = ko.validators.utilities;

  return ko.validators.validatorWithMessage(
    function (value) {
      return value === utils.getValueByElementId(otherFieldId);
    },
    message
  );
};
