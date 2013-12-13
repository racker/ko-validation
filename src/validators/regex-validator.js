ko.validators.regexValidator = function (fieldName, regex, messageFragment) {
  return ko.validators.customValidator(
    regex.test.bind(regex),
    ko.validators.utilities.buildString(
      '{$field} {$messageFragment}.',
      { 'field': fieldName, 'messageFragment': messageFragment }
    )
  );
};

