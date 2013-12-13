ko.validators.customValidator = function (validationFn, message, context) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      var result = validationFn.call(context, value);

      if (utils.isBoolean(result)) {
        return { isValid: result, message: message };
      } else if (utils.isString(result)) {
        return { isValid: false, message: result };
      }
      return result;
    }
  };
};

