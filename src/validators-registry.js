(function () {
  ko.validation.registerValidator('required', ko.validators.greaterThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('required', ko.validators.invalidCharsValidator);
  ko.validation.registerValidator('required', ko.validators.lengthValidator);
  ko.validation.registerValidator('required', ko.validators.lessThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('required', ko.validators.rangeValidator);
  ko.validation.registerValidator('required', ko.validators.requiredValidator);
}) ();

