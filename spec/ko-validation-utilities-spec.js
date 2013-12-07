describe('ko.validation.utilities', function () {
  var utilities;

  beforeEach(function () {
    utilities = ko.validation.utilities;
  });

  describe('isInteger', function () {
    it('is true for integer values', function () {
      expect(utilities.isInteger(10)).toBe(true);
      expect(utilities.isInteger('10')).toBe(true);
      expect(utilities.isInteger('-510')).toBe(true);
      expect(utilities.isInteger(-1)).toBe(true);
      expect(utilities.isInteger(0)).toBe(true);
      expect(utilities.isInteger('0')).toBe(true);
    });

    it('is false for non numeric values', function () {
      expect(utilities.isInteger('')).toBe(false);
      expect(utilities.isInteger('abc')).toBe(false);
      expect(utilities.isInteger('123abc')).toBe(false);
      expect(utilities.isInteger('12-12')).toBe(false);
    });

    it('is false for non integer numeric values', function () {
      expect(utilities.isInteger('12.1')).toBe(false);
      expect(utilities.isInteger('-14.3')).toBe(false);
      expect(utilities.isInteger('2f')).toBe(false);
    });
  });

  describe('isEmptyString', function () {
    it('is true for various forms of empty strings', function () {
      expect(utilities.isEmptyString('')).toBe(true);
      expect(utilities.isEmptyString('   ')).toBe(true);
      expect(utilities.isEmptyString('\t')).toBe(true);
      expect(utilities.isEmptyString('\n')).toBe(true);
    });

    it('is false for non empty strings', function () {
      expect(utilities.isEmptyString('1')).toBe(false);
      expect(utilities.isEmptyString('.')).toBe(false);
      expect(utilities.isEmptyString('        .')).toBe(false);
    });
  });

  describe('getValue', function () {
    describe('for text inputs', function () {
      it('gets the input value', function () {
        setFixtures('<input type="text" value="x-wing" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe('x-wing');
      });

      it('returns null when no value is set', function () {
        setFixtures('<input type="text" value="" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe(null);
      });
    });

    describe('for hidden inputs', function () {
      it('gets the input value', function () {
        setFixtures('<input type="hidden" value="x-wing" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe('x-wing');
      });

      it('returns null when no value is set', function () {
        setFixtures('<input type="hidden" value="" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe(null);
      });
    });

    describe('for checkbox inputs', function () {
      it('gets the checkbox value when it is checked', function () {
        setFixtures('<input type="checkbox" value="x-wing" id="test-input" checked="checked"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe('x-wing');
      });

      it('returns null when the checkbox is not checked', function () {
        setFixtures('<input type="checkbox" value="x-wing" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe(null);
      });
    });

    describe('for radio inputs', function () {
      it('gets the radio button value when it is checked', function () {
        setFixtures('<input type="radio" value="x-wing" id="test-input" checked="checked"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe('x-wing');
      });

      it('returns null when the radio button is not checked', function () {
        setFixtures('<input type="radio" value="x-wing" id="test-input"/>');
        expect(utilities.getValue($('#test-input')[0])).toBe(null);
      });
    });

    describe('for single select lists', function () {
      beforeEach(function () {
        setFixtures(
          '<select id="test-select">' +
            '<option value="option1">Option1</option>' +
            '<option value="option2">Option2</option>' +
            '<option value="option3">Option3</option>' +
          '</select>'
        );
      });

      it('gets the list selected value when one is selected', function () {
        $('#test-select').val('option1');
        expect(utilities.getValue($('#test-select')[0])).toBe('option1');
      });

      it('returns null when no option is selected', function () {
        $('#test-select').val(null);
        expect(utilities.getValue($('#test-select')[0])).toBe(null);
      });
    });

    describe('for multiple select lists', function () {
      beforeEach(function () {
        setFixtures(
          '<select id="test-select" multiple>' +
            '<option value="option1" id="option1">Option1</option>' +
            '<option value="option2" id="option2">Option2</option>' +
            '<option value="option3" id="option3">Option3</option>' +
          '</select>'
        );
      });

      it('gets the list of selected values when at least one is selected', function () {
        $('#option1').attr('selected', 'selected');
        $('#option2').attr('selected', 'selected');
        expect(utilities.getValue($('#test-select')[0])).toEqual(['option1', 'option2']);
      });

      it('returns null when no option is selected', function () {
        expect(utilities.getValue($('#test-select')[0])).toBe(null);
      });
    });
  });
});
