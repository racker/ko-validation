ko.validators.dependentFieldNumericValidator = function (otherFieldId, comparator, message) {
  var utils = ko.validators.utilities;

  return ko.validators.validatorWithMessage(
    function (value) {
      var otherFieldValue, valueNumeric, otherFieldValueNumeric;

      otherFieldValue = utils.getValueByElementId(otherFieldId);
      if (!utils.isInteger(otherFieldValue)) {
        return true;
      }

      valueNumeric = parseInt(value, 10);
      otherFieldValueNumeric = parseInt(otherFieldValue, 10);

      return utils.isInteger(value) && comparator(otherFieldValueNumeric)(valueNumeric);
    },
    message
  );
};

ko.validators.lessThanOrEqualToFieldValueValidator = function (otherFieldId, message) {
  return ko.validators.dependentFieldNumericValidator(
    otherFieldId,
    ko.func.operators.lessThanOrEqualTo,
    message
  );
};

ko.validators.greaterThanOrEqualToFieldValueValidator = function (otherFieldId, message) {
  return ko.validators.dependentFieldNumericValidator(
    otherFieldId,
    ko.func.operators.greaterThanOrEqualTo,
    message
  );
};

