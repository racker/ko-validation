var ko = ko || {};

ko.validation = (function () {
  var self = {};
  var registeredValidators = {};

  self.validationStates = {
    PRISTINE: 'pristine',
    INVALID: 'invalid',
    VALID: 'valid',
    FIXED: 'fixed'
  };

  self.registerValidator = function (name, validatorClass) {
    registeredValidators[name] = validatorClass;
    ko.extenders[name] = function (observable, param) {
      var isFirstValidatorForObservable = !observable.__validators__;

      if (isFirstValidatorForObservable) {
        observable.__validators__ = [];
        observable.validationState = ko.observable(self.validationStates.PRISTINE);
        observable.validationMessage = ko.observable('');
        observable.isValid = ko.computed(function () {
          return observable.validationState() !== self.validationStates.INVALID;
        });
      }

      var validator = self.utils.createValidator(name, param);
      observable.__validators__.push(validator);

      return observable;
    };
  };

  self.utils = {};

  self.utils.validatesOtherObservable = function (observable) {
    return !!observable.__validates__;
  };

  self.utils.hasValidators = function (observable) {
    return observable.__validators__ && observable.validationState;
  };

  self.utils.createValidator = function (name, params) {
    var validatorClass = registeredValidators[name];
    if (typeof(validatorClass) !== 'function') {
      throw 'Cannot create validator. Invalid validator class: ' + validatorClass;
    }
    function F() {
      return validatorClass.apply(this, params)
    }
    F.prototype = validatorClass.prototype;
    return new F();
  };

  self.utils.runValidations = function (observable) {
    if (self.utils.hasValidators(observable)) {
      var i, validator, validationResult, currentState;

      for (i = 0; i < observable.__validators__.length; i++) {
        validator = observable.__validators__[i];
        validationResult = validator.validate(observable());
        if (!validationResult.isValid()) {
          observable.validationMessage(validationResult.getMessage());
          observable.validationState(self.validationStates.INVALID);
          return;
        }
      }

      currentState = observable.validationState();
      if (currentState !== self.validationStates.VALID) {
        observable.validationMessage('');
        observable.validationState(currentState === self.validationStates.INVALID ?
          self.validationStates.FIXED :
          self.validationStates.VALID
        );
      }
    }
  };

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

  function addValidateToViewModel(viewModel) {
    if (!viewModel) {
      return;
    }
    viewModel.validate = viewModel.validate || function () {
      var propertyName, observable, valid;

      valid = true;
      for (propertyName in viewModel) {
        if (viewModel.hasOwnProperty(propertyName)) {
          observable = viewModel[propertyName];
          if (self.utils.hasValidators(observable)) {
            self.utils.runValidations(observable);
            valid = observable.isValid() && valid;
          }
        }
      }

      return valid;
    };
  }

  ko.extenders['validatesAfter'] = function (observable, param) {
    ko.utils.arrayForEach(param, function (dependencyObservable) {
      dependencyObservable.__validates__ = dependencyObservable.__validates__ || [];
      dependencyObservable.__validates__.push(observable);
    });
    return observable;
  };

  function bindEventListenerToRunValidation(element, observableToValidate) {
    var elementType = element.getAttribute('type');
    var eventName = (elementType && elementType.toLowerCase() === 'checkbox') ? 'click' : 'change';
    ko.utils.registerEventHandler(element, eventName, function (event) {
      if (self.utils.hasValidators(observableToValidate)) {
        self.utils.runValidations(observableToValidate);
      }
    });
  }

  function initValidationFor(inputElement, observable) {
    bindEventListenerToRunValidation(inputElement, observable);

    var subscription = observable.validationState.subscribe(function () {
      if (observable.__hasCustomValidationElement__) {
        subscription.dispose();
        return;
      }
      var validationElement = insertOrGetMessageElementAt(inputElement.parentNode);
      updateValidationMessage(validationElement, observable);
    });

    ko.utils.domNodeDisposal.addDisposeCallback(inputElement, function () {
      subscription.dispose();
    });
  }

  function updateValidationMessage(element, observable) {
    ko.bindingHandlers.visible.update(element, function () {
      return observable.validationState() !== self.validationStates.PRISTINE;
    });
    ko.bindingHandlers.css.update(element, function () {
      return {
        'validation-error': observable.validationState() === self.validationStates.INVALID,
        'validation-fixed': observable.validationState() === self.validationStates.FIXED
      };
    });
    ko.bindingHandlers.text.update(element, observable.validationMessage);
  }

  ko.bindingHandlers['validationMessage'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      var observable = valueAccessor();

      if (!self.utils.hasValidators(observable)) {
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
      var observable = valueAccessor();
      var originalReturn = originalInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

      if (ko.isObservable(observable)) {
        if (self.utils.hasValidators(observable)) {
          initValidationFor(element, observable);
        }

        if (self.utils.validatesOtherObservable(observable)) {
          ko.utils.arrayForEach(observable.__validates__, function (dependentObservable) {
            initValidationFor(element, dependentObservable);
          });
        }

        addValidateToViewModel(viewModel);
      }

      return originalReturn;
    };
  }

  makeHandlerValidatable('value');
  makeHandlerValidatable('checked');

  return self;
}) ();
