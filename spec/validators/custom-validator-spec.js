describe('ko.validators.customValidator', function () {
  it('passes the value to the validation function', function() {
    var validator, validation, result;

    validation = jasmine.createSpy('valicationFunction');
    validator = ko.validators.customValidator(validation);

    result = validator.validate('some value');
    expect(validation).toHaveBeenCalledWith('some value');
  });
});
