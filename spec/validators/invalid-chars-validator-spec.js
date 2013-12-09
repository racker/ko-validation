describe('ko.validators.invalidCharsValidator', function () {
  var validator;

  beforeEach(function() {
    validator = ko.validators.invalidCharsValidator('Field', ['a', 'b']);
  });

  it('passes when the value does not contain invalid chars', function() {
    expect(validator.validate('foo').isValid).toBe(true);
  });

  it('fails when the value does contain invalid chars', function() {
    expect(validator.validate('foao').isValid).toBe(false);
  });

  it('passes with an empty string', function() {
    expect(validator.validate('').isValid).toBe(true);
  });

  it('works with spaces', function() {
    validator = ko.validators.invalidCharsValidator('Field', [' ']);
    expect(validator.validate('fo o').isValid).toBe(false);
    expect(validator.validate('foo').isValid).toBe(true);
  });

  it('has empty message on valid value', function() {
    expect(validator.validate('foo').message).toBe('');
  });

  it('has correct message on failure', function() {
    expect(validator.validate('fooa').message).toBe(
      'Field cannot contain any of the characters: ab.');
  });

  it('allows a custom message', function () {
    validator = ko.validators.invalidCharsValidator('Field', ['a', 'b'], 'Custom Message');
    result = validator.validate('ball');

    expect(result.isValid).toBe(false);
    expect(result.message).toBe('Custom Message');
  });
});

