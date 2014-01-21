describe('ko.validators.invalidCharsValidator', function () {
  var validator;

  beforeEach(function () {
    validator = ko.validators.invalidCharsValidator(['a', 'b'], "Must not contain 'a' nor 'b'.");
  });

  it('passes when the value does not contain invalid chars', function () {
    expect(validator.validate('foo').isValid).toBe(true);
  });

  it('fails when the value does contain invalid chars', function () {
    expect(validator.validate('foao').isValid).toBe(false);
  });

  it('passes with an empty string', function () {
    expect(validator.validate('')).toEqual({ isValid: true });
  });

  it('works with spaces', function () {
    validator = ko.validators.invalidCharsValidator([' ']);
    expect(validator.validate('fo o').isValid).toBe(false);
    expect(validator.validate('foo').isValid).toBe(true);
  });

  it('has correct message on failure', function () {
    expect(validator.validate('fooa')).toEqual({
      isValid: false,
      message: "Must not contain 'a' nor 'b'."
    });
  });
});

