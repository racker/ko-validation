ko.validators.utilities = (function () {
  var self = {};

  function getSelectSingleValue(element) {
    return element.selectedIndex >= 0 ? element.options[element.selectedIndex].value : null;
  }

  function getSelectMultipleValue(element) {
    var values = [];
    for (var option, i = 0; option = element.options[i]; i++) {
      if (option.selected) {
        values.push(option.value);
      }
    }
    return values.length ? values : null;
  }

  self.isInteger = function (num) {
    return !self.isEmptyString(num) && isFinite(num) && num % 1 == 0;
  };

  self.isEmptyString = function (value) {
    return /^[\s\xa0]*$/.test(value == null ? '' : String(value));
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
        return element.value ? element.value : null;
    }
  };

  return self;
}) ();
