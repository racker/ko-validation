describe('Computed observable validation', function () {
  var viewModel;

  beforeEach(function () {
    var html;

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
      'required': ['Full Name is required.']
    });

    html = '<div id="parent">' +
      '<input id="firstName" data-bind="value: firstName"/>' +
      '<input id="lastName" data-bind="value: lastName"/>' +
      '</div>';

    setFixtures(html);

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

  it('throws an error when the dependent observables do not exist', function () {
    function addValidatesAfterForUndefinedObservables() {
      viewModel.fullName.extend({'validatesAfter': [undefined]});
    }

    expect(addValidatesAfterForUndefinedObservables).toThrow(
      new Error('Invalid observable specified for "validatesAfter"')
    );
  });

  it('throws an error when the specified dependent observables are not valid observables', function () {
    function addValidatesAfterForUndefinedObservables() {
      viewModel.fullName.extend({'validatesAfter': ['not-an-observable']});
    }

    expect(addValidatesAfterForUndefinedObservables).toThrow(
      new Error('Invalid observable specified for "validatesAfter"')
    );
  });
});
