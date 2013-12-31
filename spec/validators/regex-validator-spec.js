describe('ko.validators.regexValidator', function () {
  it('is valid if value matches regex', function () {
    var validator = ko.validators.regexValidator(
      'This is the message that is shown when a field is invalid.',
        /^valid$/
    );

    expect(validator.validate('valid').isValid).toBe(true);
  });

  it('is invalid if value does not match regex', function () {
    var validator = ko.validators.regexValidator(
      'This is the message that is shown when a field is invalid.',
        /^valid$/
    );

    expect(validator.validate('invalid')).toEqual({
      isValid: false,
      message: 'This is the message that is shown when a field is invalid.'
    });
  });
});
