ko.validators.regexValidator = function (regex, fieldName, messageFragment) {
  messageFragment = messageFragment || ko.validators.utilities.buildString(
    'does not match {$regex}',
    { 'regex': regex }
  );

  return ko.validators.customValidator(
    regex.test.bind(regex),
    ko.validators.utilities.buildString(
      '{$field} {$messageFragment}.',
      { 'field': fieldName, 'messageFragment': messageFragment }
    )
  );
};

