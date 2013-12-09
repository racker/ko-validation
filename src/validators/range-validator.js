ko.validators.rangeValidator = function (fieldName, min, max, customMessage) {
  var message;

  message = (min === max) ?
    '{$field} must be {$min}' :
    '{$field} must be between {$min} and {$max}';

  return {
    validate: function (value) {
      var numericValue, isInteger, isWithinRange, result;

      numericValue = parseInt(value, 10);
      isInteger = ko.validators.utilities.isInteger(value);
      isWithinRange = numericValue >= min && numericValue <= max;

      result = {};
      result.isValid = isInteger && isWithinRange;
      result.message = result.isValid ? '' : customMessage || ko.validators.utilities.buildString(
        message, {'field': fieldName, 'min': min, 'max': max}
      );

      return result;
    }
  };
};

