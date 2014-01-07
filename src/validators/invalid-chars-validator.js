ko.validators.invalidCharsValidator = function (invalidChars, message) {
  return ko.validators.validatorWithMessage(
    function (value) {
      var valueAsString = value.toString();

      return !ko.utils.arrayFirst(invalidChars, function (character) {
        return (valueAsString.indexOf(character) >= 0);
      });
    },
    message
  );
};

