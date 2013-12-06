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

    observable = ko.observable().extend({ required: ['Value is required!'] });
    expect(observable.__validators__).toContain(new RequiredValidator('Value is required!'));
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

    describe('when the input has multiple validators', function () {
      var GreaterThanValidator;

      GreaterThanValidator = function (greaterThanValue, message) {
        this.message = message;
        this.greaterThanValue = greaterThanValue;
      };

      GreaterThanValidator.prototype.validate = function (value) {
        var message = this.message;
        var greaterThanValue = this.greaterThanValue;
        return {
          isValid: function () { return value > greaterThanValue; },
          getMessage: function () { return message; }
        };
      };

      beforeEach(function () {
        ko.validation.registerValidator('greaterThan', GreaterThanValidator);
        observable.extend({ 'greaterThan': [10, 'Must be greater than 10'] });
      });

      it('sets the validation message for the first validator that fails', function () {
        $('#input').val('').trigger('change');
        expect(observable.isValid()).toBe(false);
        expect(observable.validationMessage()).toBe('Value is required');
      });

      it('sets the validation of the second validator when the first one is valid', function () {
        $('#input').val(9).trigger('change');
        expect(observable.isValid()).toBe(false);
        expect(observable.validationMessage()).toBe('Must be greater than 10');
      });

      it('sets the observable to valid state when all validators pass', function () {
        $('input').val(11).trigger('change');
        expect(observable.isValid()).toBe(true);
        expect(observable.validationMessage()).toBe('');
      });
    });
  });
});
