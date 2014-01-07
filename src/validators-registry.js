(function () {
  ko.validation.registerValidator('greaterThanOrEqualToFieldValue', ko.validators.greaterThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('equalToFieldValue', ko.validators.equalToFieldValueValidator),
  ko.validation.registerValidator('invalidChars', ko.validators.invalidCharsValidator);
  ko.validation.registerValidator('maxLength', ko.validators.maxLengthValidator);
  ko.validation.registerValidator('minLength', ko.validators.minLengthValidator);
  ko.validation.registerValidator('lessThanOrEqualToFieldValue', ko.validators.lessThanOrEqualToFieldValueValidator);
  ko.validation.registerValidator('range', ko.validators.rangeValidator);
  ko.validation.registerValidator('required', ko.validators.requiredValidator);
  ko.validation.registerValidator('email', ko.validators.emailValidator);
  ko.validation.registerValidator('custom', ko.validators.customValidator);
  ko.validation.registerValidator('greaterThan', ko.validators.greaterThanValueValidator);
  ko.validation.registerValidator('integer', ko.validators.integerValidator);
  ko.validation.registerValidator('regex', ko.validators.regexValidator);
  ko.validation.registerValidator('onlyIf', ko.validators.onlyIfValidator);
}) ();

