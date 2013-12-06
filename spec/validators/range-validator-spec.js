describe('ko.validators.rangeValidator', function() {
  var validator, result;

  beforeEach(function() {
    validator = ko.validators.rangeValidator('Field', 1, 10);
  });

  it('should pass if value is a number within range', function() {
    result = validator.validate(5);
    expect(result.isValid).toBe(true);
  });

  it('should pass if value is a string within range', function() {
    result = validator.validate('5');
    expect(result.isValid).toBe(true);
  });

  it('should fail if not a number', function() {
    result = validator.validate('10a');
    expect(result.isValid).toBe(false);
  });

  it('should fail if not an integer', function() {
    result = validator.validate('9.5');
    expect(result.isValid).toBe(false);
  });

  it('should fail if less than range', function() {
    result = validator.validate(0);
    expect(result.isValid).toBe(false);
  });

  it('should fail if greater than range', function() {
    result = validator.validate(11);
    expect(result.isValid).toBe(false);
  });

  it('should provide an empty error message when valid', function() {
    result = validator.validate(10);
    expect(result.isValid).toBe(true);
    expect(result.message).toBe('');
  });

  it('should provide a meaningful error message when not valid', function() {
    result = validator.validate(0);
    expect(result.message).toBe('Field must be between 1 and 10');
  });

  it('should display a single value message when min and max are equal', function () {
    validator = ko.validators.rangeValidator('Field', 10, 10);
    result = validator.validate(0);
    expect(result.message).toBe('Field must be 10');
  });

  it('can have a custom message', function () {
    validator = ko.validators.rangeValidator('Field', 10, 15, 'This value is not valid, dude!');
    result = validator.validate(0);
    expect(result.message).toBe('This value is not valid, dude!');
  });
});

