ko.validators.results.result = function (isValid, message) {
  return { isValid: isValid, message: message };
}

ko.validators.results.valid = ko.validators.results.result.bind(null, true);
ko.validators.results.invalid = ko.validators.results.result.bind(null, false);
