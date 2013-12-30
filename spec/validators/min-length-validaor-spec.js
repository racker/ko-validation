describe('ko.validators.minLengthValidator', function() {
  var validator, result;

  beforeEach(function() {
    validator = ko.validators.minLengthValidator('Field', 3);
  });

  it('should pass if the length is exactly the limit', function() {
    result = validator.validate('foo');
    expect(result).toEqual({ isValid: true });
  });

  it('should pass if the length is more than the limit', function() {
    result = validator.validate('foobar');
    expect(result).toEqual({ isValid: true });
  });

  it('should fail if the length is less than the limit', function() {
    result = validator.validate('no');
    expect(result.isValid).toBe(false);
  });

  it('should have correct message on failure', function() {
    result = validator.validate('no');
    expect(result.message).toBe('Field must be at least 3 characters.');
  });
});

