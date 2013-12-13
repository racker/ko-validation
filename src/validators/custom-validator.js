ko.validators.customValidator = function (validationFn, message, context) {
  return {
    validate: function (value) {
      return validationFn.call(context, value);
    }
  };
};

