describe('ko.validators.regexValidator', function () {
  var validator;

  beforeEach(function() {
    validator = ko.validators.regexValidator('field_name', /^valid$/, 'does not match /^valid$/');
  });

  it('is invalid if value does not match regex', function () {
    expect(validator.validate('invalid')).toEqual({
      isValid: false,
      message: 'field_name does not match /^valid$/.'
    });
  });

  it('is invalid if value does not match regex', function () {
    expect(validator.validate('valid').isValid).toBe(true);
  });
});

