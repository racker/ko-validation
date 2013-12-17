describe('ko validation integration', function () {
  var viewModel;

  beforeEach(function () {
    setFixtures(
      '<div id="parent">' +
      '<input id="required-input" data-bind="value: requiredField"/>' +
      '<input id="greater-than-input" data-bind="value: greaterThanField"/>' +
      '<input id="less-than-other-field-input" data-bind="value: lessThanOtherField"/>' +
      '<input id="sometimes-required-input" data-bind="value: sometimesRequired"/>' +
      '<input id="numeric-input" data-bind="value: integerField"/>' +
      '</div>'
    );

    viewModel = {
      requiredField: ko.observable('').extend({
        'required': ['First Name']
      }),
      greaterThanField: ko.observable('').extend({
        'greaterThan': [ 'Big number', 42 ]
      }),
      lessThanOtherField: ko.observable('').extend({
        'lessThanOrEqualToFieldValue': [ 'Small number', 'Big number', 'greater-than-input' ]
      }),
      integerField: ko.observable('').extend({
        'integer': [ 'A number' ]
      }),
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

  describe('for less than or equal to other field validator', function () {
    it('is invalid', function () {
      $('#greater-than-input').val(99).trigger('change');
      $('#less-than-other-field-input').val(100).trigger('change');

      expect(viewModel.lessThanOtherField).not.toBeValid();
    });

    it('is valid', function () {
      $('#greater-than-input').val(51).trigger('change');
      $('#less-than-other-field-input').val(51).trigger('change');

      expect(viewModel.lessThanOtherField).toBeValid();
    });
  });

  describe('for integer validator', function () {
    it('is invalid', function () {
      $('#numeric-input').val('3.1415').trigger('change');

      expect(viewModel.integerField).not.toBeValid();
    });

    it('is valid', function () {
      $('#greater-than-input').val('3').trigger('change');

      expect(viewModel.integerField).toBeValid();
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
