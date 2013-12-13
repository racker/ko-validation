describe('ko.validators.integerValidator', function () {
  var validator;

  beforeEach(function() {
    validator = ko.validators.integerValidator('field_name');
  });

  it('is valid if value is a number', function () {
    expect(validator.validate('10').isValid).toBe(true);
  });

  it('is valid if value is zero', function () {
    expect(validator.validate('0').isValid).toBe(true);
  });

  it('is valid if value is a negative number', function () {
    expect(validator.validate('-10').isValid).toBe(true);
  });

  it('is invalid if the value is a string that contains a number', function () {
    expect(validator.validate('10questions')).toEqual({
      isValid: false,
      message: 'field_name must be a number.'
    });
  });

  it('is invalid if the value is not integer', function () {
    expect(validator.validate('10.5')).toEqual({
      isValid: false,
      message: 'field_name must be a number.'
    });
  });

  it('is invalid if value is not a number', function () {
    expect(validator.validate('string')).toEqual({
      isValid: false,
      message: 'field_name must be a number.'
    });
  });
});

