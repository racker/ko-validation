ko.validators.onlyIfValidator = function (requirement, actualValidator) {
  var utils = ko.validators.utilities;

  function createValidatorFromConfig(validatorConfig) {
    var name = Object.keys(validatorConfig)[0];

    return ko.validation.utils.createValidator(name, validatorConfig[name]);
  }

  if (!utils.isFunction(actualValidator.validate)) {
    actualValidator = createValidatorFromConfig(actualValidator);
  }

  return {
    validate: function (value) {
      if (!requirement()) {
        return ko.validators.results.valid();
      }
      return actualValidator.validate(value);
    }
  };
};
