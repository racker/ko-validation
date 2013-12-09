describe('Computed observable validation', function () {
  var viewModel;

  beforeEach(function () {
    ko.validation.registerValidator('required', ko.validators.requiredValidator);

    viewModel = {};
    viewModel.firstName = ko.observable('');
    viewModel.lastName = ko.observable('');
    viewModel.fullName = ko.computed(function () {
      if (viewModel.firstName() || viewModel.lastName()) {
        return viewModel.firstName() + viewModel.lastName();
      }
      return '';
    }).extend({
      'validatesAfter': [viewModel.firstName, viewModel.lastName],
      'required': ['Full Name']
    });

    setFixtures(
      '<div id="parent">' +
        '<input id="firstName" data-bind="value: firstName"/>' +
        '<input id="lastName" data-bind="value: lastName"/>' +
      '</div>'
    );

    ko.applyBindings(viewModel, $('#parent')[0]);
  });

  it('fails if the computed value is not valid after one of its dependencies change', function () {
    $('#firstName').val('').trigger('change');

    expect(viewModel.fullName()).toBe('');
    expect(viewModel.fullName.isValid()).toBe(false);
    expect(viewModel.fullName.validationMessage()).toBe('Full Name is required.');
  });

  it('succeeds if the computed value is valid after one of its dependencies change', function () {
    $('#firstName').val('John').trigger('change');

    expect(viewModel.fullName()).toBe('John');
    expect(viewModel.fullName.isValid()).toBe(true);
  });
});
