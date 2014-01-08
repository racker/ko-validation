describe('ko.validators.lengthValidator', function () {
  it('is valid if operator returns true with the value', function () {
    var op = jasmine.createSpy('op').andReturn(true);
    var validator = ko.validators.lengthValidator(op);

    expect(validator.validate('four')).toEqual({ isValid: true });
    expect(op).toHaveBeenCalledWith('four'.length);
  });

  it('is not valid if operator returns false with the value', function () {
    var op = jasmine.createSpy('op').andReturn(false);
    var validator = ko.validators.lengthValidator(op, 'Not valid.');

    expect(validator.validate('five')).toEqual({ isValid: false, message: 'Not valid.' });
    expect(op).toHaveBeenCalledWith('five'.length);
  });
});

