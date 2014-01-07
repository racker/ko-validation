describe('ko.validators.lengthValidator', function() {
  var validator, result;

  beforeEach(function() {
    validator = ko.validators.lengthValidator(5, 'Cannot be longer than 5 characters.');
  });

  it('should pass if the length is in the limit', function() {
    result = validator.validate('foo');
    expect(result).toEqual({ isValid: true });
  });

  it('should check the length of an integer', function() {
    result = validator.validate(123);
    expect(result.isValid).toBe(true);
  });

  it('should fail if the length is not in the limit', function() {
    result = validator.validate('foo-bar');
    expect(result.isValid).toBe(false);
  });

  it('should have correct message on failure', function() {
    result = validator.validate('foo-bar');
    expect(result.message).toBe('Cannot be longer than 5 characters.');
  });
});

