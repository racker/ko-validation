describe('ko.validation.utils', function () {
  it('can create an validator by its registered name', function () {
    var validatorCreator, validatorInstance;

    validatorCreator = jasmine.createSpy('requiredValidator').andReturn({
      validate: 'fake_validator'
    });
    ko.validation.registerValidator('fake', validatorCreator);

    validatorInstance = ko.validation.utils.createValidator('fake', ['uga', 'buga']);

    expect(validatorInstance).toEqual({ validate: 'fake_validator' });
    expect(validatorCreator).toHaveBeenCalledWith('uga', 'buga');
  });
});
