describe('Validation message element', function () {
  var viewModel;

  beforeEach(function () {
    ko.validation.registerValidator('required', ko.validators.requiredValidator);

    viewModel = {
      firstName: ko.observable('').extend({ 'required': ['First Name'] })
    };
  });

  describe('when a custom validation element is not specified', function () {
    beforeEach(function () {
      setFixtures(
        '<div id="parent">' +
          '<input id="firstName" data-bind="value: firstName"/>' +
        '</div>'
      );

      ko.applyBindings(viewModel, $('#parent')[0]);
    });

    it("inserts an element in the input's parent for showing the validation message", function () {
      var validationElement;

      $('#firstName').val('').trigger('change');

      validationElement = $($('#parent').children()[1]);
      expect(validationElement.text()).toBe('First Name is required.');
      expect(validationElement).toHaveClass('validation-message');
      expect(validationElement).toHaveClass('validation-error');
    });

    it('changes the element class to "validation-fixed" when the observable is fixed', function () {
      var validationElement;

      $('#firstName').val('').trigger('change');
      $('#firstName').val('Jack').trigger('change');

      validationElement = $($('#parent').children()[1]);
      expect(validationElement.text()).toBe('');
      expect(validationElement).toHaveClass('validation-message');
      expect(validationElement).toHaveClass('validation-fixed');
    });
  });

  describe('when a custom validation element is specified', function() {
    var messageElement;

    beforeEach(function () {
      setFixtures(
        '<div id="parent">' +
          '<div>' +
            '<input id="firstName" data-bind="value: firstName"/>' +
          '</div>' +
          '<span id="messageElement" data-bind="validationMessage: firstName"></span>' +
        '</div>'
      );

      ko.applyBindings(viewModel, $('#parent')[0]);

      messageElement = $('#messageElement');
    });

    it('shows the validation message in the specified validation message element', function () {
      $('#firstName').val('').trigger('change');

      expect(messageElement.text()).toBe('First Name is required.');
      expect(messageElement).toHaveClass('validation-message');
      expect(messageElement).toHaveClass('validation-error');
    });

    it('changes the element class to validation-fixed when the errors are fixed', function () {
      $('#firstName').val('').trigger('change');
      $('#firstName').val('Chuck').trigger('change');

      expect(messageElement.text()).toBe('');
      expect(messageElement).toHaveClass('validation-message');
      expect(messageElement).toHaveClass('validation-fixed');
    });
  });
});
