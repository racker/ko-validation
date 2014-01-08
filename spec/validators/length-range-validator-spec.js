describe('ko.validators.lengthRangeValidator', function() {
  var validator, result;

  beforeEach(function() {
    validator = ko.validators.lengthRangeValidator(5, 12, 'Field must be within 5 and 12 characters');
  });

  it('should pass if the length is within the limits', function() {
    result = validator.validate('asdfasdf');
    expect(result).toEqual({ isValid: true });
  });

  it('should pass if the length is the minimum', function() {
    result = validator.validate('asdfa');
    expect(result).toEqual({ isValid: true });
  });

  it('should pass if the length is the maximum', function() {
    result = validator.validate('asdfasdfasdf');
    expect(result).toEqual({ isValid: true });
  });

  it('should fail if the length is too low', function() {
    result = validator.validate('asd');
    expect(result.isValid).toBe(false);
  });

  it('should fail if the length is too great', function() {
    result = validator.validate('asdfasdfasdfasdf');
    expect(result.isValid).toBe(false);
  });

  it('should have correct message on failure', function() {
    result = validator.validate('asdf');
    expect(result.message).toBe('Field must be within 5 and 12 characters');
  });
});

