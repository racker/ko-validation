describe('ko.validators.greaterThanValueValidator', function () {
  it('should pass if the value is greater than the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator('whatevis', 42);

    expect(validator.validate('43').isValid).toBe(true);
  });

  it('should fail if the value is equal to the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator('le_field', 23);

    expect(validator.validate('23')).toEqual({
      isValid: false,
      message: 'le_field must be greater than 23.'
    });
  });

  it('should fail if the value is less than the minimum', function () {
    var validator = ko.validators.greaterThanValueValidator('ze_field', 4);

    expect(validator.validate('3')).toEqual({
      isValid: false,
      message: 'ze_field must be greater than 4.'
    });
  });
});

