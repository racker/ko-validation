describe('ko.validators.greaterThanValueValidator', function () {
  it('should pass if the value is greater than the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator(42);

    expect(validator.validate('43').isValid).toBe(true);
  });

  it('should fail if the value is equal to the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator(23, 'Must be great.');

    expect(validator.validate('23')).toEqual({
      isValid: false,
      message: 'Must be great.'
    });
  });

  it('should fail if the value is less than the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator(4, 'Must be grand.');

    expect(validator.validate('3')).toEqual({
      isValid: false,
      message: 'Must be grand.'
    });
  });
});

