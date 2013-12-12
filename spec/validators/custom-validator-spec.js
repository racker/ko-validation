describe('ko.validators.customValidator', function () {
  it('passes the value and context to the validation function', function() {
    var validator, validation, result;

    validation = jasmine.createSpy('valicationFunction');
    context = { id: 'le_context' };

    validator = ko.validators.customValidator(validation, context);
    result = validator.validate('some value');

    expect(validation).toHaveBeenCalledWith('some value');
    expect(validation.mostRecentCall.object).toBe(context);
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

  describe('when validation returns a boolean', function () {
    var validator, validationSpy;

    beforeEach(function () {
      validation = jasmine.createSpy();
      validator = ko.validators.customValidator(validation);
    });

    it('is valid if `true`', function () {
      validation.andReturn(true);

      expect(validator.validate()).toEqual({ isValid: true });
    });

    it('is not valid if `false`', function () {
      validation.andReturn(false);

      expect(validator.validate()).toEqual({ isValid: false });
    });
  });
});
