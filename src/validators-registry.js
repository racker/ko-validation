(function () {
  ko.validation.registerValidator('greaterThanOrEqualToFieldValue', ko.validators.greaterThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('invalidChars', ko.validators.invalidCharsValidator);
  ko.validation.registerValidator('length', ko.validators.lengthValidator);
  ko.validation.registerValidator('lessThanOrEqualToFieldValue', ko.validators.lessThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('range', ko.validators.rangeValidator);
  ko.validation.registerValidator('required', ko.validators.requiredValidator);
  ko.validation.registerValidator('custom', ko.validators.customValidator);
  ko.validation.registerValidator('greaterThan', ko.validators.greaterThanValueValidator);
  ko.validation.registerValidator('integer', ko.validators.integerValidator);
  ko.validation.registerValidator('regex', ko.validators.regexValidator);
  ko.validation.registerValidator('onlyIf', ko.validators.onlyIfValidator);
}) ();

