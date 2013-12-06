describe('ko-validation', function () {
  var validator, RequiredValidator;

  RequiredValidator = function (message) {
    this.message = message;
  };

  RequiredValidator.prototype.validate = function (value) {
    return {
      isValid: function () { return !!value; },
      getMessage: function () { return this.message; }
    };
  };

  it('allows registering validators', function () {
    var observable;

    ko.validation.registerValidator('required', RequiredValidator);

    observable = ko.observable().extend({ required: [''] });
    expect(observable.__validators__).toContain(new RequiredValidator(''));
  });

  describe('validation states', function () {
    var observable, viewModel;

    beforeEach(function () {
      ko.validation.registerValidator('required', RequiredValidator);

      observable = ko.observable().extend({ required: ['Value is required'] });
      viewModel = { obs: observable };

      setFixtures('<div id="parent"><input id="input" data-bind="value: obs"/></div>');
      ko.applyBindings(viewModel, $('#parent')[0]);

    });

    it('is pristine', function () {
      expect(observable.validationState()).toBe(ko.validation.validationStates.PRISTINE);
    });

    it('is invalid', function () {
      $('#input').val('').trigger('change');

      expect(observable.validationState()).toBe(ko.validation.validationStates.INVALID);
    });

    it('is valid', function () {
      $('#input').val('value').trigger('change');

      expect(observable.validationState()).toBe(ko.validation.validationStates.VALID);
    });

    it('stays valid after it is changed from a valid state to another valid state', function () {
      $('#input').val('value1').trigger('change');
      $('#input').val('value2').trigger('change');

      expect(observable.validationState()).toBe(ko.validation.validationStates.VALID);
    });

    it('goes back to invalid after being valid', function () {
      $('#input').val('value').trigger('change');
      $('#input').val('').trigger('change');

      expect(observable.validationState()).toBe(ko.validation.validationStates.INVALID);
    });

    it('goes to fixed after being invalid', function () {
      $('#input').val('').trigger('change');
      $('#input').val('value').trigger('change');

      expect(observable.validationState()).toBe(ko.validation.validationStates.FIXED);
    });
  });
});
