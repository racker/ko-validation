ko.validators.invalidCharsValidator = function (fieldName, invalidChars, customMessage) {
  return {
    validate: function (value) {
      var result = {};
      var valueAsString = value.toString();

      isValid = true;
      ko.utils.arrayForEach(invalidChars, function (character) {
        if (valueAsString.indexOf(character) >= 0) {
          isValid = false;
        }
      });

      result.isValid = isValid;
      result.message = result.isValid ? '' : customMessage || ko.validation.config.i18n(
       '{$field} cannot contain any of the characters: {$chars}.',
        {'field' : fieldName, 'chars': invalidChars.join('')}
      );

      return result;
    }
  };
};

