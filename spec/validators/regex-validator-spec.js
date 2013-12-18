describe('ko.validators.regexValidator', function () {
  it('is valid if value matches regex', function () {
    var validator = ko.validators.regexValidator(/^valid$/);

    expect(validator.validate('valid').isValid).toBe(true);
  });

  it('is invalid if value does not match regex', function () {
    var validator = ko.validators.regexValidator(/^valid$/, 'field_name');

    expect(validator.validate('invalid')).toEqual({
      isValid: false,
      message: 'field_name does not match /^valid$/.'
    });
  });

  it('is invalid with special message if value does not match regex', function () {
    var validator = ko.validators.regexValidator(/[0-9]+/, 'field_name', 'does not have a digit');

    expect(validator.validate('not a digit')).toEqual({
      isValid: false,
      message: 'field_name does not have a digit.'
    });
  });
});

