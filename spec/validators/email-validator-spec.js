describe('ko.validators.emailValidator', function () {
  var validator, result;

  beforeEach(function () {
    validator = ko.validators.emailValidator();
  });

  it('is invalid for bad domain name in email', function () {
    result = validator.validate('knockout@validation');
    expect(result).toEqual({
      isValid: false,
      message: 'Invalid email address.'
    });
  });

  it('is invalid for invalid char', function () {
    result = validator.validate('knock!out@validation.com');
    expect(result).toEqual({
      isValid: false,
      message: 'Invalid email address.'
    });
  });

  it('is valid for proper email input', function () {
    result = validator.validate('knockout@validation.com');
    expect(result.isValid).toBe(true);
  });
});
