describe('ko validation integration', function () {
  var viewModel;

  beforeEach(function () {
    setFixtures(
      '<div id="parent">' +
      '<input id="required-input" data-bind="value: requiredField"/>' +
      '<input id="greater-than-input" data-bind="value: greaterThanField"/>' +
      '</div>'
    );

    viewModel = {
      requiredField: ko.observable('').extend({ 'required': ['First Name'] }),
      greaterThanField: ko.observable('').extend({ 'greaterThan': [ 'greaterThanField', 42 ] })
    };

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
});
