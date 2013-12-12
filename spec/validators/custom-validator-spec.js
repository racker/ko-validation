describe('ko.validators.customValidator', function () {
  it('passes the value to the validation function', function() {
    var validator, validation, result;

    validation = jasmine.createSpy('valicationFunction');
    validator = ko.validators.customValidator(validation);

    result = validator.validate('some value');
    expect(validation).toHaveBeenCalledWith('some value');
  });

  it('returns the result of the validation function', function() {
    var validator, validation, result;

    validation = function (value) {
      return {
        isValid: false,
        message: ['"', value, '" is invalid because of reasons.'].join('')
      };
    };
    validator = ko.validators.customValidator(validation);

    result = validator.validate('le_value');
    expect(result).toEqual({
      isValid: false,
      message: '"le_value" is invalid because of reasons.'
    });
  });
});
