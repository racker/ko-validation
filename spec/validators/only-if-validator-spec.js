describe('ko.validators.onlyIfValidator', function () {
  function constant(value) {
    return function () {
      return value;
    };
  }

  it('is valid if requisite is not met', function () {
    var validator = ko.validators.onlyIfValidator(constant(false));

    expect(validator.validate('whatever')).toEqual({ isValid: true });
  });

  it('runs other validator if requisite is met', function () {
    var validator = ko.validators.onlyIfValidator(
      constant(true),
      {
        validate: jasmine.createSpy('actualValidator.validate').andReturn({
          isValid: false,
          message: 'Your value is invalid.'
        })
      }
    );

    expect(validator.validate('something')).toEqual({
      isValid: false,
      message: 'Your value is invalid.'
    });
  });
});

