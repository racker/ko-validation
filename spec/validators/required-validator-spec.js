describe('ko.validators.requiredValidator', function () {
  var validator, result;

  beforeEach(function () {
    validator = ko.validators.requiredValidator('Field Name is required.');
  });

  it('is invalid for empty string', function () {
    result = validator.validate('');
    expect(result).toEqual({
      isValid: false,
      message: 'Field Name is required.'
    });
  });

  it('is invalid if null', function () {
    result = validator.validate(null);
    expect(result).toEqual({
      isValid: false,
      message: 'Field Name is required.'
    });
  });

  it('is invalid if undefined', function () {
    result = validator.validate(undefined);
    expect(result).toEqual({
      isValid: false,
      message: 'Field Name is required.'
    });
  });

  it('is invalid if false', function () {
    result = validator.validate(false);
    expect(result).toEqual({
      isValid: false,
      message: 'Field Name is required.'
    });
  });

  it('is invalid if empty array', function () {
    result = validator.validate([]);
    expect(result).toEqual({
      isValid: false,
      message: 'Field Name is required.'
    });
  });

  it('is valid if string "0"', function () {
    result = validator.validate('0');
    expect(result).toEqual({ isValid: true });
  });

  it('is valid if number 0', function () {
    result = validator.validate(0);
    expect(result).toEqual({ isValid: true });
  });

  it('is valid if string "false"', function () {
    result = validator.validate('false');
    expect(result).toEqual({ isValid: true });
  });

  it('is valid if not empty', function () {
    result = validator.validate('value');
    expect(result).toEqual({ isValid: true });
  });
});
