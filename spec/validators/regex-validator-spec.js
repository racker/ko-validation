describe('ko.validators.regexValidator', function () {
  it('is valid if value matches regex', function () {
    var validator = ko.validators.regexValidator(/^valid$/);

    expect(validator.validate('valid').isValid).toBe(true);
  });

  it('is invalid if value does not match regex', function () {
    var validator = ko.validators.regexValidator(/^valid$/, 'Must match /^valid$/.');

    expect(validator.validate('invalid')).toEqual({
      isValid: false,
      message: 'Must match /^valid$/.'
    });
  });
});

