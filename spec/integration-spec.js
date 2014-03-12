describe('ko validation integration', function () {
  var viewModel;

  beforeEach(function () {
    var customValidatorContext, customValidatorFunction, html;

    html = '<div id="parent">' +
      '<input id="required-input" data-bind="value: requiredField"/>' +
      '<input id="equal-to-input" data-bind="value: equalField"/>' +
      '<input id="equal-to-field-input" data-bind="value: equalToField"/>' +
      '<input id="greater-than-input"/>' +
      '<input id="greater-than-other-field-input" data-bind="value: greaterThanOrEqualField"/>' +
      '<input id="less-than-other-field-input" data-bind="value: lessThanOtherField"/>' +
      '<input id="sometimes-required-input" data-bind="value: sometimesRequired"/>' +
      '<input id="numeric-input" data-bind="value: integerField"/>' +
      '<input id="no-numbers-input" data-bind="value: noNumbersField"/>' +
      '<input id="short-input" data-bind="value: shortField"/>' +
      '<input id="range-input" data-bind="value: rangeField"/>' +
      '<input id="regex-input" data-bind="value: regexField"/>' +
      '<input id="email-input" data-bind="value: emailField"/>' +
      '<input id="custom-input" data-bind="value: customField"/>' +
      '<input name="cb-group" type="checkbox" value="cb-value-1" id="cb-input-1" data-bind="checked: checkboxField"/>' +
      '<input name="cb-group" type="checkbox" value="cb-value-2" id="cb-input-2" data-bind="checked: checkboxField"/>' +
      '<input name="cb-group" type="checkbox" value="cb-value-3" id="cb-input-3" data-bind="checked: checkboxField"/>' +
      '<input name="cb-group" type="checkbox" value="cb-value-4" id="cb-input-4" data-bind="checked: checkboxField"/>' +
      '</div>';

    setFixtures(html);

    customValidatorContext = { toTest: 'foo' };
    customValidatorFunction = function (value) {
      return { isValid: value === this.toTest, message: '' };
    };

    viewModel = {
      requiredField: ko.observable('First Name').extend({
        'required': ['First Name is required.']
      }),
      equalField: ko.observable(''),
      equalToField: ko.observable('').extend({
        'equalToFieldValue': [ 'equal-to-input', 'Must be equal to the other.' ]
      }),
      greaterThanOrEqualField: ko.observable('').extend({
        'greaterThanOrEqualToFieldValue': [ 'greater-than-input', 'Must be greater than that.' ]
      }),
      lessThanOtherField: ko.observable('').extend({
        'lessThanOrEqualToFieldValue': [ 'greater-than-input', 'Must be less than that.' ]
      }),
      integerField: ko.observable('').extend({
        'integer': [ 'Must be number' ]
      }),
      noNumbersField: ko.observable('').extend({
        'invalidChars': [ String.prototype.split.call(['1234567890'], ''), 'Must not have numbers.' ]
      }),
      shortField: ko.observable('').extend({
        'maxLength': [ 8, 'Must be short.' ]
      }),
      rangeField: ko.observable('').extend({
        'range': [ 10, 100, 'Must be between 10 and 100.' ]
      }),
      regexField: ko.observable('').extend({
        'regex': [ /^[0-9]+$/, 'Must have only digits.' ]
      }),
      emailField: ko.observable('').extend({
        'email': [ 'Must be an email.' ]
      }),
      customField: ko.observable('').extend({
        'custom': [customValidatorFunction, customValidatorContext]
      }),
      checkboxField: ko.observableArray([]).extend({
        'required': [ 'At least one checkbox must be selected!' ]
      }),
      isItRequired: ko.observable(true)
    };

    viewModel.sometimesRequired = ko.observable('Sometimes').extend({
      'onlyIf': [viewModel.isItRequired, { 'required': [ 'Sometimes' ] }]
    });

    ko.applyBindings(viewModel, $('#parent')[0]);
  });

  describe('for email validator', function () {
    it('is invalid', function () {
      $('#email-input').val('test@wrong-email').trigger('change');

      expect(viewModel.emailField).not.toBeValid();
    });

    it('is valid', function () {
      $('#required-input').val('test@wrong.email').trigger('change');

      expect(viewModel.emailField).toBeValid();
    });
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

  describe('equal to field validator', function () {
    beforeEach(function () {
      $('#equal-to-input').val('foo').trigger('change');
    });

    it('is valid when both input values are the same', function () {
      $('#equal-to-field-input').val('foo').trigger('change');

      expect(viewModel.equalToField).toBeValid();
    });

    it('is not valid when has different values', function () {
      $('#equal-to-field-input').val('bar').trigger('change');

      expect(viewModel.equalToField).not.toBeValid();
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

  describe('for greater than or equal to other field validator', function () {
    it('is invalid', function () {
      $('#greater-than-input').val(99).trigger('change');
      $('#greater-than-other-field-input').val(98).trigger('change');

      expect(viewModel.greaterThanOrEqualField).not.toBeValid();
    });

    it('is valid', function () {
      $('#greater-than-input').val(99).trigger('change');
      $('#greater-than-other-field-input').val(100).trigger('change');

      expect(viewModel.greaterThanOrEqualField).toBeValid();
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

  describe('for invalid chars validator', function () {
    it('is invalid', function () {
      $('#no-numbers-input').val('n0 numbers').trigger('change');

      expect(viewModel.noNumbersField).not.toBeValid();
    });

    it('is valid', function () {
      $('#no-numbers-input').val('no numbers').trigger('change');

      expect(viewModel.noNumbersField).toBeValid();
    });
  });

  describe('for max length validator', function () {
    it('is invalid', function () {
      $('#short-input').val('exceedingly long value').trigger('change');

      expect(viewModel.shortField).not.toBeValid();
    });

    it('is valid', function () {
      $('#short-input').val('ship it').trigger('change');

      expect(viewModel.shortField).toBeValid();
    });
  });

  describe('for range validator', function () {
    it('is invalid', function () {
      $('#range-input').val('600').trigger('change');

      expect(viewModel.rangeField).not.toBeValid();
    });

    it('is valid', function () {
      $('#range-input').val('40').trigger('change');

      expect(viewModel.rangeField).toBeValid();
    });
  });

  describe('for regex validator', function () {
    it('is invalid', function () {
      $('#regex-input').val('only numbers').trigger('change');

      expect(viewModel.regexField).not.toBeValid();
    });

    it('is valid', function () {
      $('#regex-input').val('094813').trigger('change');

      expect(viewModel.regexField).toBeValid();
    });
  });

  describe('for onlyIf required validator', function () {
    it('is invalid when requirement is true and value is not valid', function () {
      viewModel.isItRequired(true);
      $('#sometimes-required-input').val('').trigger('change');

      expect(viewModel.sometimesRequired).not.toBeValid();
    });

    it('is valid', function () {
      viewModel.isItRequired(true);
      $('#sometimes-required-input').val('Jonh').trigger('change');

      expect(viewModel.sometimesRequired).toBeValid();
    });

    it('is valid when requirement is not true', function () {
      viewModel.isItRequired(false);
      $('#sometimes-required-input').val('').trigger('change');

      expect(viewModel.sometimesRequired).toBeValid();
    });
  });

  describe('for custom validator', function () {
    it('is valid', function () {
      $('#custom-input').val('foo').trigger('change');

      expect(viewModel.customField).toBeValid();
    });

    it('is invalid', function () {
      $('#custom-input').val('notFoo').trigger('change');

      expect(viewModel.customField).not.toBeValid();
    });
  });

  describe('for checkbox fields', function () {
    it('validates whenever a checkbox is clicked', function () {
      $('#cb-input-2').click();

      expect(viewModel.checkboxField()).toEqual(['cb-value-2']);
      expect(viewModel.checkboxField.isValid()).toBe(true);
      expect($('#parent').find('.validation-message').text()).toBe('');

      $('#cb-input-2').click();

      expect(viewModel.checkboxField()).toEqual([]);
      expect(viewModel.checkboxField.isValid()).toBe(false);
      expect($('#parent').find('.validation-message').text()).toBe('At least one checkbox must be selected!');
    });
  });
});
