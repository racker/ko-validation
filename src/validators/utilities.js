ko.validators.utilities = (function () {
  var self = {};

  function getSelectSingleValue(element) {
    return element.selectedIndex >= 0 ? element.options[element.selectedIndex].value : null;
  }

  function getSelectMultipleValue(element) {
    var values, options, option, i;

    values = [];
    options = element.options;

    for (i = 0; i < options.length; i++) {
      if (options.hasOwnProperty(i)) {

        option = options[i];

        if (option.selected) {
          values.push(option.value);
        }
      }
    }
    return values.length ? values : null;
  }

  self.isArray = function (value) {
    if (!value) {
      return false;
    }
    return Array.isArray(value) || (typeof value === 'object' && typeof value.length === 'number');
  };

  self.isBoolean = function (value) {
    return typeof value === 'boolean';
  };

  self.isString = function (value) {
    return typeof value === 'string';
  };

  self.isNumber = function (num) {
    return !self.isEmptyString(num) && isFinite(num) && (num !== false);
  };

  self.isInteger = function (num) {
    return self.isNumber(num) && num % 1 === 0;
  };

  self.isEmptyString = function (value) {
    return (/^[\s\xa0]*$/).test(value === null ? '' : String(value));
  };

  self.isFunction = function (value) {
    return typeof value === 'function' && Object.prototype.toString.call(value) === '[object Function]';
  };

  self.identity = function (value) {
    return value;
  };

  self.getValue = function (element) {
    var type = element.type;
    if (!type || !type.toLowerCase) { return null; }

    switch (type.toLowerCase()) {
    case 'checkbox':
    case 'radio':
      return element.checked ? element.value : null;
    case 'select-one':
      return getSelectSingleValue(element);
    case 'select-multiple':
      return getSelectMultipleValue(element);
    default:
      return element.value || null;
    }
  };

  self.getValueByElementId = function (elementId) {
    return self.getValue(document.getElementById(elementId));
  };

  self.objectForEach = function (object, callback) {
    var key;

    for (key in object) {
      if (object.hasOwnProperty(key)) {
        callback(object[key], key);
      }
    }
  };

  self.makeFunction = function (value) {
    return self.isFunction(value) ? value : self.identity.bind(self, value);
  };

  self.validateWithMessage = function (isValueValidFn, message) {
    var messageFn = self.makeFunction(message);

    return function (value) {
      var isValid = !!isValueValidFn(value);
      return { isValid: isValid, message: isValid ? undefined : messageFn(value) };
    };
  };

  return self;
}());
