ko.validators.rangeValidator = function (fieldName, min, max, customMessage) {
  var message = (min === max) ?
    '{$field} must be {$min}' :
    '{$field} must be between {$min} and {$max}';

  return {
    validate: function (value) {
      var numericValue = parseInt(value, 10);
      var isInteger = ko.validators.utilities.isInteger(value);
      var isWithinRange = numericValue >= min && numericValue <= max;

      var result = {};

      result.isValid = isInteger && isWithinRange;
      result.message = result.isValid ? '' : customMessage || ko.validation.config.i18n(
        message, {'field': fieldName, 'min': min, 'max': max}
      );

      return result;
    }
  };
};

