describe('ko.validators.equalToFieldValueValidator', function () {
  var validator, result, otherField;

  beforeEach(function () {
    setFixtures('<div id="main"><input id="otherField" type="text"></input></div>');
    otherField = $('#otherField');
    otherField.val('foo');

    validator = ko.validators.equalToFieldValueValidator(
      'FieldName',
      'OtherFieldName',
      'otherField'
    );
  });

  it('should pass if the value is equal to the value in the specified field', function () {
    result = validator.validate('foo');

    expect(result.isValid).toBe(true);
  });

  it('should fail if the value is less than the value in the specified field', function () {
    result = validator.validate('bar');

    expect(result.isValid).toBe(false);
  });

  it('should show an error message on failure', function () {
    result = validator.validate('bar');

    expect(result.message).toBe('FieldName must be equal to OtherFieldName.');
  });

  it('should accept a custom error message', function () {
    validator = ko.validators.equalToFieldValueValidator(
      'FieldName',
      'OtherFieldName',
      'otherField',
      'Custom validation message'
    );
    result = validator.validate('bar');

    expect(result.message).toBe('Custom validation message');
  });
});

