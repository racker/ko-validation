describe('ko.validation.utils', function () {
  var utils = ko.validation.utils;

  it('can create an validator by its registered name', function () {
    var validatorCreator, validatorInstance;

    validatorCreator = jasmine.createSpy('requiredValidator').andReturn({
      validate: 'fake_validator'
    });
    ko.validation.registerValidator('fake', validatorCreator);

    validatorInstance = utils.createValidator('fake', ['uga', 'buga']);

    expect(validatorInstance).toEqual({ validate: 'fake_validator' });
    expect(validatorCreator).toHaveBeenCalledWith('uga', 'buga');
  });

  it('throws an Error when trying to create an not-registered validator', function () {
    expect(function () {
      utils.createValidator('not_registered');
    }).toThrow(
      new Error('Cannot create validator with name "not_registered". Validator class is not registered.')
    );
  });
});
