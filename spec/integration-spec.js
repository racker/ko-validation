describe('ko validation integration', function () {
  var viewModel;

  beforeEach(function () {
    var customValidatorContext, customValidatorFunction;

    setFixtures(
      '<div id="parent">' +
      '<input id="required-input" data-bind="value: requiredField"/>' +
      '<input id="greater-than-input" data-bind="value: greaterThanField"/>' +
      '<input id="greater-than-other-field-input" data-bind="value: greaterThanOrEqualField"/>' +
      '<input id="less-than-other-field-input" data-bind="value: lessThanOtherField"/>' +
      '<input id="sometimes-required-input" data-bind="value: sometimesRequired"/>' +
      '<input id="numeric-input" data-bind="value: integerField"/>' +
      '<input id="no-numbers-input" data-bind="value: noNumbersField"/>' +
      '<input id="short-input" data-bind="value: shortField"/>' +
      '<input id="range-input" data-bind="value: rangeField"/>' +
      '<input id="regex-input" data-bind="value: regexField"/>' +
      '<input id="custom-input" data-bind="value: customField"/>' +
      '</div>'
    );

    customValidatorContext = { toTest: 'foo' };
    customValidatorFunction = function (value) {
      return { isValid: value === this.toTest, message: '' }
    };

    viewModel = {
      requiredField: ko.observable('').extend({
        'required': ['First Name']
      }),
      greaterThanField: ko.observable('').extend({
        'greaterThan': [ 'Big number', 42 ]
      }),
      greaterThanOrEqualField: ko.observable('').extend({
        'greaterThanOrEqualToFieldValue': [ 'Big number', 'Small Number', 'greater-than-input' ]
      }),
      lessThanOtherField: ko.observable('').extend({
        'lessThanOrEqualToFieldValue': [ 'Small number', 'Big number', 'greater-than-input' ]
      }),
      integerField: ko.observable('').extend({
        'integer': [ 'A number' ]
      }),
      noNumbersField: ko.observable('').extend({
        'invalidChars': [ 'No numbers', '1234567890'.split('') ]
      }),
      shortField: ko.observable('').extend({
        'length': [ 'Short', 8 ]
      }),
      rangeField: ko.observable('').extend({
        'range': [ 'Ranged', 10, 100 ]
      }),
      regexField: ko.observable('').extend({
        'regex': [ /^[0-9]+$/, 'Regular' ]
      }),
      customField: ko.observable('').extend({
        'custom': [customValidatorFunction, customValidatorContext]
      }),
      isItRequired: ko.observable(true)
    };
    viewModel['sometimesRequired'] = ko.observable('').extend({
      'onlyIf': [viewModel.isItRequired, { 'required': [ 'Sometimes' ] }]
    });

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

  describe('for length validator', function () {
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
      $('#required-input').val('').trigger('change');

      expect(viewModel.requiredField).not.toBeValid();
    });

    it('is valid', function () {
      viewModel.isItRequired(true);
      $('#required-input').val('Jonh').trigger('change');

      expect(viewModel.requiredField).toBeValid();
    });

    it('is valid when requirement is not true', function () {
      viewModel.isItRequired(false);
      $('#required-input').val('').trigger('change');

      expect(viewModel.requiredField).not.toBeValid();
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
});
