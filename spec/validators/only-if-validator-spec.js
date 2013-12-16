describe('ko.validators.onlyIfValidator', function () {
  function constant(value) {
    return function () {
      return value;
    };
  }

  it('is valid if requisite is not met', function () {
    var validator = ko.validators.onlyIfValidator(constant(false));

    expect(validator.validate('wahtever')).toEqual({ isValid: true });
  });
});

