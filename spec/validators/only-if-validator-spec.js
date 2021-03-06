describe('ko.validators.onlyIfValidator', function () {
  function constant(value) {
    return function () {
      return value;
    };
  }

  it('is valid if requirement is not met', function () {
    var validator = ko.validators.onlyIfValidator(
      constant(false),
      ko.validators.requiredValidator()
    );

    expect(validator.validate('whatever')).toEqual({ isValid: true });
  });

  it('runs other validator if requirement is met', function () {
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

  it('finds other validators by its specification', function () {
    var validator = ko.validators.onlyIfValidator(
      constant(true),
      {
        'required': ['In these particular condition, this field is required.']
      }
    );

    expect(validator.validate('')).toEqual({
      isValid: false,
      message: 'In these particular condition, this field is required.'
    });
  });
});

