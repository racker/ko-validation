describe('ko.func.operators', function () {
  var op;

  beforeEach(function () {
    op = ko.func.operators;
  });

  describe('strictEquals', function () {
    it('is true', function () {
      expect(op.strictEquals(1)(1)).toBe(true, '1 === 1 ?');
      expect(op.strictEquals('10')('10')).toBe(true, '"10" === "10" ?');
    });

    it('is false', function () {
      expect(op.strictEquals(3)('3')).toBe(false, '"3" === 3 ?');
      expect(op.strictEquals('')(false)).toBe(false, 'false === "" ?');
      expect(op.strictEquals({})({})).toBe(false, '{} === {} ?');
      expect(op.strictEquals('one')('two')).toBe(false, '"two" === "one" ?');
    });
  });

  describe('greaterThan', function () {
    it('is true', function () {
      expect(op.greaterThan(1)(2)).toBe(true, '2 > 1 ?');
    });

    it('is false', function () {
      expect(op.greaterThan(2)(1)).toBe(false, '1 > 2 ?');
      expect(op.greaterThan(2)(2)).toBe(false, '2 > 2 ?');
    });
  });

  describe('greaterThanOrEqualTo', function () {
    it('is true', function () {
      expect(op.greaterThanOrEqualTo(1)(2)).toBe(true, '2 >= 1 ?');
      expect(op.greaterThanOrEqualTo(2)(2)).toBe(true, '2 >= 2 ?');
    });

    it('is false', function () {
      expect(op.greaterThanOrEqualTo(2)(1)).toBe(false, '1 >= 2 ?');
    });
  });

  describe('lessThan', function () {
    it('is true', function () {
      expect(op.lessThan(3)(2)).toBe(true, '2 < 3 ?');
    });

    it('is false', function () {
      expect(op.lessThan(2)(3)).toBe(false, '3 < 2 ?');
      expect(op.lessThan(3)(3)).toBe(false, '3 < 3 ?');
    });
  });

  describe('lessThanOrEqualTo', function () {
    it('is true', function () {
      expect(op.lessThanOrEqualTo(3)(2)).toBe(true, '2 <= 3 ?');
      expect(op.lessThanOrEqualTo(3)(3)).toBe(true, '3 <= 3 ?');
    });

    it('is false', function () {
      expect(op.lessThanOrEqualTo(2)(3)).toBe(false, '3 <= 2 ?');
    });
  });

  describe('range', function () {
    it('is true', function () {
      expect(op.range(8, 80)(8)).toBe(true, '8 between [8, 80] ?');
      expect(op.range(3, 7)(7)).toBe(true, '7 between [3, 7] ?');
      expect(op.range(16, 32)(22)).toBe(true, '22 between [16, 22] ?');
    });

    it('is false', function () {
      expect(op.range(100, 200)(99)).toBe(false, '99 between [100, 200] ?');
      expect(op.range(10, 20)(21)).toBe(false, '21 between [10, 20] ?');
    });
  });
});
