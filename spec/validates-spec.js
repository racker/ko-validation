describe('validation using the "validates" utility', function () {
  var viewModel, checkFirstName;

  beforeEach(function () {
    var html;

    viewModel = {};
    viewModel.checkFirstName = function () { return checkFirstName; };
    viewModel.firstName = ko.observable('abcdefg').extend({
      'onlyIf': [viewModel.checkFirstName, { 'required': [ 'First name' ] }]
    });
    viewModel.lastName = ko.observable('hijlkmno').extend({
      'validates': [viewModel.firstName]
    });

    html = '<div id="parent">' +
      '<input id="firstName" data-bind="value: firstName"/>' +
      '<input id="lastName" data-bind="value: lastName"/>' +
      '</div>';

    setFixtures(html);

    ko.applyBindings(viewModel, $('#parent')[0]);
  });

  it('re-triggers validation on the other field when changed', function () {
    checkFirstName = true;
    $('#firstName').val('').trigger('change');
    expect(viewModel.firstName.isValid()).toBe(false);

    checkFirstName = false;
    $('#lastName').val('abcdefg').trigger('change');
    expect(viewModel.firstName.isValid()).toBe(true);
  });
});
