ko.validators.onlyIfValidator = function (requisite, actualValidator) {
  var utils = ko.validators.utilities;

  if (!utils.isFunction(actualValidator.validate)) {
    actualValidator = createValidatorFromConfig(actualValidator);
  }
  function createValidatorFromConfig(validatorConfig) {
    var name = Object.keys(validatorConfig)[0];

    return ko.validation.utils.createValidator(name, validatorConfig[name]);
  };

  return {
    validate: function (value) {
      if (!requisite()) {
        return ko.validators.results.valid();
      }
      return actualValidator.validate(value);
    }
  };
};

