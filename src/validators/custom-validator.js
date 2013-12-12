ko.validators.customValidator = function (validationFn) {
  return {
    validate: function (value) {
      return validationFn(value);
    }
  };
};

