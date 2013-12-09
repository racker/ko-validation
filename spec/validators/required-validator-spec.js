describe('ko.validators.requiredValidator', function () {
  var validator, result;

  beforeEach(function () {
    validator = ko.validators.requiredValidator('Field Name');
  });

  it('fails for empty string', function () {
    result = validator.validate('');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Field Name is required.');
  });

  it('fails if null', function() {
    result = validator.validate(null);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Field Name is required.');
  });

  it('fails if undefined', function() {
    result = validator.validate(undefined);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Field Name is required.');
  });

  it('fails if false', function() {
    result = validator.validate(false);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Field Name is required.');
  });

  it('fails if empty array', function() {
    result = validator.validate([]);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Field Name is required.');
  });

  it('should not fail if string "false"', function () {
    result = validator.validate('false');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('');
  });

  it('should pass if not empty', function() {
    result = validator.validate('value');
    expect(result.isValid).toBe(true);
  });

  it('should provide an empty message if valid', function() {
    result = validator.validate('value');
    expect(result.message).toBe('');
  });

  it('should provide a meaningful message if invalid', function() {
    result = validator.validate('');
    expect(result.message).toBe('Field Name is required.');
  });

  it('should provide a custom message if specified', function() {
    validator = ko.validators.requiredValidator('Field', 'message');
    result = validator.validate('');
    expect(result.message).toBe('message');
  });
});
