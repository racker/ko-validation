ko.validation.validationStates = {
  PRISTINE: 'pristine',
  INVALID: 'invalid',
  VALID: 'valid',
  FIXED: 'fixed'
};

ko.validation.registeredValidators = {};

ko.validation.utils = (function () {
  var self = {};

  self.validatesOtherObservable = function (observable) {
    return !!observable.__validates__;
  };

  self.hasValidators = function (observable) {
    return observable.__validators__ && observable.validationState;
  };

  self.createValidator = function (name, params) {
    var validatorFactory = ko.validation.registeredValidators[name];

    if (typeof validatorFactory !== 'function') {
      throw new Error([
        'Cannot create validator with name "',
        name,
        '". Validator class is ',
        validatorFactory || 'not registered.'
      ].join(''));
    }

    return validatorFactory.apply(this, params);
  };

  self.runValidations = function (observable) {
    if (self.hasValidators(observable)) {
      var i, validator, validationResult, currentState;

      for (i = 0; i < observable.__validators__.length; i++) {
        validator = observable.__validators__[i];
        validationResult = validator.validate(observable());
        if (!validationResult.isValid) {
          observable.validationMessage(validationResult.message || '');
          observable.validationState(ko.validation.validationStates.INVALID);
          return;
        }
      }

      currentState = observable.validationState();
      if (currentState !== ko.validation.validationStates.VALID) {
        observable.validationMessage('');
        observable.validationState(
          currentState === ko.validation.validationStates.INVALID
            ? ko.validation.validationStates.FIXED
            : ko.validation.validationStates.VALID
        );
      }
    }
  };

  self.addValidateToViewModel = function (viewModel) {
    if (!viewModel) {
      return;
    }
    viewModel.validate = viewModel.validate || function () {
      var propertyName, observable, valid;

      valid = true;
      for (propertyName in viewModel) {
        if (viewModel.hasOwnProperty(propertyName)) {
          observable = viewModel[propertyName];
          if (self.hasValidators(observable)) {
            self.runValidations(observable);
            valid = observable.isValid() && valid;
          }
        }
      }

      return valid;
    };
  };

  return self;
}());

ko.validation.registerValidator = function (name, validatorFactory) {
  ko.validation.registeredValidators[name] = validatorFactory;
  ko.extenders[name] = function (observable, param) {
    var isFirstValidatorForObservable, validator;

    isFirstValidatorForObservable = !observable.__validators__;

    if (isFirstValidatorForObservable) {
      observable.__validators__ = [];
      observable.validationState = ko.observable(
        ko.validation.validationStates.PRISTINE
      ).extend({
        'notify': 'always'
      });
      observable.validationMessage = ko.observable('');
      observable.validate = function () {
        ko.validation.utils.runValidations(observable);
      };
      observable.isValid = ko.computed(function () {
        return observable.validationState() !== ko.validation.validationStates.INVALID;
      });
      observable.subscribe(function () {
        ko.validation.utils.runValidations(observable);
      });
    }

    validator = ko.validation.utils.createValidator(name, param);
    observable.__validators__.push(validator);

    return observable;
  };
};

(function () {
  function insertOrGetMessageElementAt(element) {
    var validationElement = element.querySelector('.validation-message');
    if (!validationElement) {
      validationElement = document.createElement('SPAN');
      validationElement.className = 'validation-message';
      validationElement.style.display = 'none';
      element.appendChild(validationElement);
    }
    return validationElement;
  }

  function updateValidationMessage(element, observable) {
    ko.bindingHandlers.visible.update(element, function () {
      return observable.validationState() !== ko.validation.validationStates.PRISTINE;
    });
    ko.bindingHandlers.css.update(element, function () {
      return {
        'validation-error': observable.validationState() === ko.validation.validationStates.INVALID,
        'validation-fixed': observable.validationState() === ko.validation.validationStates.FIXED
      };
    });
    ko.bindingHandlers.text.update(element, observable.validationMessage);
  }

  function initValidationFor(inputElement, observable) {
    var messageSubscription = observable.validationState.subscribe(function () {
      if (observable.__hasCustomValidationElement__) {
        messageSubscription.dispose();
        return;
      }
      var validationElement = insertOrGetMessageElementAt(inputElement.parentNode);
      updateValidationMessage(validationElement, observable);
    });

    ko.utils.domNodeDisposal.addDisposeCallback(inputElement, function () {
      messageSubscription.dispose();
    });
  }

  ko.extenders.validatesAfter = function (observable, dependentObservables) {
    ko.utils.arrayForEach(dependentObservables, function (dependentObservable) {
      dependentObservable.__validates__ = dependentObservable.__validates__ || [];
      dependentObservable.__validates__.push(observable);
    });
    return observable;
  };

  ko.extenders.validates = function (observable, dependentObservables) {
    ko.utils.arrayForEach(dependentObservables, function (dependentObservable) {
      observable.subscribe(function () {
        ko.validation.utils.runValidations(dependentObservable);
      });
    });
    return observable;
  };

  ko.bindingHandlers.validationMessage = {
    init: function (element, valueAccessor) {
      var observable = valueAccessor();

      if (!ko.validation.utils.hasValidators(observable)) {
        throw new Error("'validationMessage' should be used with an observable that has validation");
      }

      observable.__hasCustomValidationElement__ = true;
      ko.bindingHandlers.css.update(element, function () {
        return { 'validation-message': true };
      });
      observable.validationState.subscribe(function () {
        updateValidationMessage(element, observable);
      });
    }
  };

  function makeHandlerValidatable(handler) {
    var originalInit = ko.bindingHandlers[handler].init;

    ko.bindingHandlers[handler].init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var observable, originalReturn;

      observable = valueAccessor();
      originalReturn = originalInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

      if (ko.isObservable(observable)) {
        if (ko.validation.utils.hasValidators(observable)) {
          initValidationFor(element, observable);
        }

        if (ko.validation.utils.validatesOtherObservable(observable)) {
          ko.utils.arrayForEach(observable.__validates__, function (dependentObservable) {
            initValidationFor(element, dependentObservable);
          });
        }

        ko.validation.utils.addValidateToViewModel(viewModel);
      }

      return originalReturn;
    };
  }

  makeHandlerValidatable('value');
  makeHandlerValidatable('checked');
}());
