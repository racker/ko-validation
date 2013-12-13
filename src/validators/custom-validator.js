ko.validators.customValidator = function (validationFn, context) {
  return { validate: validationFn.bind(context) };
};

