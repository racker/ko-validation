describe('View Model with validatable observables', function () {
  var viewModel;

  beforeEach(function () {
    var html;

    viewModel = {
      'name': ko.observable().extend({ 'required': ['Name is required.'] }),
      'age': ko.observable().extend({ 'required': ['Age is required.'] })
    };

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
