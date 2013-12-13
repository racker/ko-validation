ko.validators.customValidator = function (validationFn, context) {
  return {
    validate: function (value) {
      return validationFn.call(context, value);
    }
  };
};

