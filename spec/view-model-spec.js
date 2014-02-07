describe('View Model with validatable observables', function () {
  var viewModel;

  beforeEach(function () {
    viewModel = {
      'name': ko.observable().extend({ 'required': ['Name is required.'] }),
      'age': ko.observable().extend({ 'required': ['Age is required.'] })
    };
  });

  describe('when view model is rendered', function () {
    beforeEach(function () {
      var html;

      html = '<div id="parent">' +
               '<input id="name" data-bind="value: name"/>' +
               '<input id="age" data-bind="value: age"/>' +
             '</div>';

      setFixtures(html);
      ko.applyBindings(viewModel, $('#parent')[0]);
    });

    it('has a "validate" method added to it', function () {
      expect(typeof viewModel.validate).toBe('function');
    });

    it('validates all its observables when "validate" is called', function () {
      viewModel.validate();

      expect(viewModel.name.isValid()).toBe(false);
      expect(viewModel.name.validationMessage()).toBe('Name is required.');

      expect(viewModel.age.isValid()).toBe(false);
      expect(viewModel.age.validationMessage()).toBe('Age is required.');
    });
  });

  describe('when view model get validation added to it', function () {
    beforeEach(function () {
      ko.validation.util.addValidateToViewModel(viewModel);
    });

    it('has a "validate" method added to it', function () {
      expect(typeof viewModel.validate).toBe('function');
    });

    it('validates all its observables when "validate" is called', function () {
      viewModel.validate();

      expect(viewModel.name.isValid()).toBe(false);
      expect(viewModel.name.validationMessage()).toBe('Name is required.');

      expect(viewModel.age.isValid()).toBe(false);
      expect(viewModel.age.validationMessage()).toBe('Age is required.');
    });
  });
});
