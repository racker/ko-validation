describe('ko-validation', function () {
  var validator, RequiredValidator;

  RequiredValidator = function (message) {
    this.message = message;
  };

  RequiredValidator.prototype.validate = function (value) {
    var message = this.message;
    return {
      isValid: function () { return !!value; },
      getMessage: function () { return message; }
    };
  };

  it('allows registering validators', function () {
    var observable;

    ko.validation.registerValidator('required', RequiredValidator);

    observable = ko.observable().extend({ required: [''] });
    expect(observable.__validators__).toContain(new RequiredValidator(''));
  });

  describe('validating an input', function () {
    var observable, viewModel;

    beforeEach(function () {
      ko.validation.registerValidator('required', RequiredValidator);

      observable = ko.observable().extend({ required: ['Value is required'] });
      viewModel = { obs: observable };

      setFixtures('<div id="parent"><input id="input" data-bind="value: obs"/></div>');
      ko.applyBindings(viewModel, $('#parent')[0]);
    });

    describe('validation states', function () {

      it('is pristine', function () {
        expect(observable.validationState()).toBe(ko.validation.validationStates.PRISTINE);
        expect(observable.isValid()).toBe(true);
        expect(observable.validationMessage()).toBe('');
      });

      it('is invalid', function () {
        $('#input').val('').trigger('change');

        expect(observable.validationState()).toBe(ko.validation.validationStates.INVALID);
        expect(observable.isValid()).toBe(false);
        expect(observable.validationMessage()).toBe('Value is required');
      });

      it('is valid', function () {
        $('#input').val('value').trigger('change');

        expect(observable.validationState()).toBe(ko.validation.validationStates.VALID);
        expect(observable.isValid()).toBe(true);
        expect(observable.validationMessage()).toBe('');
      });

      it('stays valid after it is changed from a valid state to another valid state', function () {
        $('#input').val('value1').trigger('change');
        $('#input').val('value2').trigger('change');

        expect(observable.validationState()).toBe(ko.validation.validationStates.VALID);
        expect(observable.isValid()).toBe(true);
        expect(observable.validationMessage()).toBe('');
      });

      it('goes back to invalid after being valid', function () {
        $('#input').val('value').trigger('change');
        $('#input').val('').trigger('change');

        expect(observable.validationState()).toBe(ko.validation.validationStates.INVALID);
        expect(observable.isValid()).toBe(false);
        expect(observable.validationMessage()).toBe('Value is required');
      });

      it('goes to fixed after being invalid', function () {
        $('#input').val('').trigger('change');
        $('#input').val('value').trigger('change');

        expect(observable.validationState()).toBe(ko.validation.validationStates.FIXED);
        expect(observable.isValid()).toBe(true);
        expect(observable.validationMessage()).toBe('');
      });
    });
  });
});
