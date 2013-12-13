describe('ko.validators.greaterThanOrEqualToFieldValueValidator', function () {
  var validator, result, otherField;

  beforeEach(function () {
    setFixtures('<div id="main"><input id="otherField" type="text"></input></div>');
    otherField = $('#otherField');
    otherField.val('10');

    validator = ko.validators.greaterThanOrEqualToFieldValueValidator(
      'FieldName',
      'OtherFieldName',
      'otherField'
    );
  });

  it('should pass if the value is equal to the value in the specified field', function () {
    result = validator.validate('10');

    expect(result.isValid).toBe(true);
  });

  it('should pass if the value is greater than the value in the specified field', function () {
    result = validator.validate('11');

    expect(result.isValid).toBe(true);
  });

  it('should fail if the value is less than the value in the specified field', function () {
    result = validator.validate('9');

    expect(result.isValid).toBe(false);
  });

  it('should show an error message on failure', function () {
    result = validator.validate('9');

    expect(result.message).toBe('FieldName must be greater than or equal to OtherFieldName.');
  });
});

