import { contents, attach, typeTag, registrate, getMethod } from '../src/ast/type';

describe('AST', () => {
  describe('types', () => {
    test('tag types', () => {
      const type1 = 'Node';
      const type2 = 'tag';
      const type3 = 'typeTag';
      const type4 = 'typeTag';
      expect(typeTag(attach(type1, 1))).toBe(type1);
      expect(typeTag(attach(type2, 1))).toBe(type2);
      expect(typeTag(attach(type3, 1))).toBe(type3);
      expect(typeTag(attach(type4, 1))).toBe(type4);
    });

    test('test simple values', () => {
      const bool = true;
      const str = 'str';
      const numb = 3;
      const undef = undefined;
      const Null = null;
      expect(contents(attach('bool', bool))).toBe(bool);
      expect(contents(attach('str', str))).toBe(str);
      expect(contents(attach('numb', numb))).toBe(numb);
      expect(contents(attach('undef', undef))).toBe(undef);
      expect(contents(attach('Null', Null))).toBe(Null);
    });

    test('test object values', () => {
      const funcArr = () => {};
      const func = function func() { };
      const obj = {};
      const arr = [];

      expect(contents(attach('funcArr', funcArr))).toBe(funcArr);
      expect(contents(attach('func', func))).toBe(func);
      expect(contents(attach('obj', obj))).toBe(obj);
      expect(contents(attach('arr', arr))).toBe(arr);
    });
  });

  describe('function to test binding', () => {
    const type = 'someType';
    const otherType = 'otherType';
    const func = function func() {};
    const funcArr = () => {};
    const funcName = 'funcName';
    const funcArrName = 'funcArrName';
    const otherFuncName = 'otherFuncName';

    test('registration and geting method', () => {
      registrate(type, funcName, func);
      registrate(type, funcArrName, funcArr);

      expect(getMethod(attach(type, 1), funcName)).toBe(func);
      expect(getMethod(attach(type, 1), funcArrName)).toBe(funcArr);
    });

    test('registration method with same type and name should throw', () => {
      expect(() => {
        registrate(type, funcName, func);
      }).toThrow();
      expect(() => {
        registrate(type, funcArrName, funcArr);
      }).toThrow();
    });

    test('geting method unregistrated method should throw', () => {
      expect(() => {
        getMethod(attach(otherType, 1), funcName);
      }).toThrow();
      expect(() => {
        getMethod(attach(type, 1), otherFuncName);
      }).toThrow();
    });
  });
});
