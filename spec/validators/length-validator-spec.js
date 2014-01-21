describe('ko.validators.lengthValidator', function () {
  var op, validator;

  it('is valid if operator returns true with the value', function () {
    op = jasmine.createSpy('op').andReturn(true);
    validator = ko.validators.lengthValidator(op);

    expect(validator.validate('four')).toEqual({ isValid: true });
    expect(op).toHaveBeenCalledWith('four'.length);
  });

  it('is not valid if operator returns false with the value', function () {
    op = jasmine.createSpy('op').andReturn(false);
    validator = ko.validators.lengthValidator(op, 'Not valid.');

    expect(validator.validate('five')).toEqual({ isValid: false, message: 'Not valid.' });
    expect(op).toHaveBeenCalledWith('five'.length);
  });
});

