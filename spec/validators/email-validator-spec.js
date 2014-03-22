describe('ko.validators.emailValidator', function () {
  var validator, result;

  beforeEach(function () {
    validator = ko.validators.emailValidator('Email address is not valid.');
  });

  it('is invalid for bad domain name in email', function () {
    result = validator.validate('knockout@validation');
    expect(result).toEqual({
      isValid: false,
      message: 'Email address is not valid.'
    });
  });

  it('is invalid for invalid char', function () {
    result = validator.validate('knock!out@validation.com');
    expect(result).toEqual({
      isValid: false,
      message: 'Email address is not valid.'
    });
  });

  it('is invalid for TLD bigger than 12 characters', function () {
    result = validator.validate('knockout@validation.constructionS');
    expect(result).toEqual({
      isValid: false,
      message: 'Email address is not valid.'
    });
  });

  it('is valid for proper email input', function () {
    result = validator.validate('knockout@validation.com');
    expect(result).toEqual({ isValid: true });
  });
});
