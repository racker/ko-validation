ko.validators.regexValidator = function (regex, fieldName, messageFragment) {
  var utils = ko.validators.utilities;
  messageFragment = messageFragment || ko.validators.utilities.buildString(
    'does not match {$regex}',
    { 'regex': regex }
  );

  return ko.validators.customValidator(
    utils.validateWithMessage(
      regex.test.bind(regex),
      utils.buildString(
        '{$field} {$messageFragment}.',
        { 'field': fieldName, 'messageFragment': messageFragment }
      )
    )
  );
};

