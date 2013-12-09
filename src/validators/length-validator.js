ko.validators.lengthValidator = function (fieldName, length) {
  return {
    validate: function (value) {
      var result;

      result = {};
      result.isValid = value.toString().trim().length <= length;

      result.message = result.isValid ? '' : ko.validators.utilities.buildString(
       '{$field} cannot be longer than {$len} characters.',
        {'field' : fieldName, 'len' : length}
      );

      return result;
    }
  };
};

