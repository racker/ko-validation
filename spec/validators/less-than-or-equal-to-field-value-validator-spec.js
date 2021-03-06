describe('ko.validators.lessThanOrEqualToFieldValueValidator', function () {
  var validator, result, otherField;

  beforeEach(function () {
    setFixtures('<div id="main"><input id="otherField" type="text"></input></div>');
    otherField = $('#otherField');
    otherField.val('10');

    validator = ko.validators.lessThanOrEqualToFieldValueValidator(
      'otherField',
      'This must be less than or equal to that'
    );
  });

  it('passes if the value is equal to the value in the specified field', function () {
    result = validator.validate('10');

    expect(result.isValid).toBe(true);
  });

  it('passes if the value is less than the value in the specified field', function () {
    result = validator.validate('9');

    expect(result.isValid).toBe(true);
  });

  it('fails if the value is greater than the value in the specified field', function () {
    result = validator.validate('11');

    expect(result.isValid).toBe(false);
  });

  it('shows an error message on failure', function () {
    result = validator.validate('11');

    expect(result.message).toBe('This must be less than or equal to that');
  });
});

