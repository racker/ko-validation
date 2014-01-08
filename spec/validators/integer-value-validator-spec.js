describe('ko.validators.integerValueValidator', function () {
  it('is not valid if value is not a number', function () {
    var validator = ko.validators.integerValueValidator(null, 'Failed.');

    expect(validator.validate('1number')).toEqual({
      isValid: false,
      message: 'Failed.'
    });
  });

  it('is valid if value pass the operator', function () {
    var op = jasmine.createSpy('op').andReturn(true);
    var validator = ko.validators.integerValueValidator(op);

    expect(validator.validate(777)).toEqual({ isValid: true });
    expect(op).toHaveBeenCalledWith(777);
  });

  it('is not valid if value does not pass the operator', function () {
    var op = jasmine.createSpy('op').andReturn(false);
    var validator = ko.validators.integerValueValidator(op, 'Not valid.');

    expect(validator.validate(888)).toEqual({ isValid: false, message: 'Not valid.' });
    expect(op).toHaveBeenCalledWith(888);
  });
});

