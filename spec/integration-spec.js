describe('ko validation integration', function () {
  var viewModel;

  beforeEach(function () {
    setFixtures(
      '<div id="parent">' +
      '<input id="required-input" data-bind="value: requiredField"/>' +
      '<input id="greater-than-input" data-bind="value: greaterThanField"/>' +
      '<input id="sometimes-required-input" data-bind="value: sometimesRequired"/>' +
      '</div>'
    );

    viewModel = {
      requiredField: ko.observable('').extend({ 'required': ['First Name'] }),
      greaterThanField: ko.observable('').extend({ 'greaterThan': [ 'greaterThanField', 42 ] }),
      isItRequired: ko.observable(true)
    };
    viewModel['sometimesRequired'] = ko.observable('').extend({
      'onlyIf': [viewModel.isItRequired, { 'required': [ 'Sometimes' ] }]
    });

    ko.applyBindings(viewModel, $('#parent')[0]);
  });

  describe('for required validator', function () {
    it('is invalid', function () {
      $('#required-input').val('').trigger('change');

      expect(viewModel.requiredField).not.toBeValid();
    });

    it('is valid', function () {
      $('#required-input').val('Jonh').trigger('change');

      expect(viewModel.requiredField).toBeValid();
    });
  });

  describe('for greater than validator', function () {
    it('is invalid', function () {
      $('#greater-than-input').val(42).trigger('change');

      expect(viewModel.greaterThanField).not.toBeValid();
    });

    it('is valid', function () {
      $('#greater-than-input').val(43).trigger('change');

      expect(viewModel.greaterThanField).toBeValid();
    });
  });

  describe('for onlyIf required validator', function () {
    it('is invalid when requirement is true and value is not valid', function () {
      viewModel.isItRequired(true);
      $('#required-input').val('').trigger('change');

      expect(viewModel.requiredField).not.toBeValid();
    });

    it('is valid', function () {
      viewModel.isItRequired(true);
      $('#required-input').val('Jonh').trigger('change');

      expect(viewModel.requiredField).toBeValid();
    });

    it('is valid when requirement is not true', function () {
      viewModel.isItRequired(false);
      $('#required-input').val('').trigger('change');

      expect(viewModel.requiredField).not.toBeValid();
    });
  });
});
