ko.validators.customValidator = function (validationFn) {
  return {
    validate: function (value) {
      validationFn(value);
      return {};
    }
  };
};

