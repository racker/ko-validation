describe('ko.validators.customValidator', function () {
  it('passes the value and context to the validation function', function () {
    var validator, validation, context;

    validation = jasmine.createSpy('validationFunction');
    context = { id: 'le_context' };

    validator = ko.validators.customValidator(validation, context);
    validator.validate('le_value');

    expect(validation).toHaveBeenCalledWith('le_value');
    expect(validation.mostRecentCall.object).toBe(context);
  });

  it('returns the result of the validation function', function () {
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
