ko.validators.onlyIfValidator = function (requisite, actualValidator) {
  var utils = ko.validators.utilities;

  return {
    validate: function (value) {
      if (!requisite()) {
        return ko.validators.results.valid();
      }
      return actualValidator.validate(value);
    }
  };
};

