ko.validators.customValidator = function (validationFn, context) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      var result = validationFn.call(context, value);

      if (utils.isBoolean(result)) {
        return { isValid: result };
      } else if (utils.isString(result)) {
        return { isValid: false, message: result };
      }
      return result;
    }
  };
};

