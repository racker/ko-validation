describe('ko.validators.integerValueValidator', function () {
  var op, validator;

  it('is not valid if value is not a number', function () {
    op = jasmine.createSpy('op').andReturn(true);
    validator = ko.validators.integerValueValidator(op, 'Failed.');

    expect(validator.validate('1number')).toEqual({
      isValid: false,
      message: 'Failed.'
    });
  });

  it('is valid if operator returns true with the value', function () {
    op = jasmine.createSpy('op').andReturn(true);
    validator = ko.validators.integerValueValidator(op);

    expect(validator.validate(777)).toEqual({ isValid: true });
    expect(op).toHaveBeenCalledWith(777);
  });

  it('is not valid if operator returns false with the value', function () {
    op = jasmine.createSpy('op').andReturn(false);
    validator = ko.validators.integerValueValidator(op, 'Not valid.');

    expect(validator.validate(888)).toEqual({ isValid: false, message: 'Not valid.' });
    expect(op).toHaveBeenCalledWith(888);
  });

  it('is valid if value is undefined', function () {
    op = jasmine.createSpy('op').andReturn(true);
    validator = ko.validators.integerValueValidator(op);

    expect(validator.validate()).toEqual({ isValid: true });
    expect(op).not.toHaveBeenCalled();
  });
});

