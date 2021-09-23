import convertArrayToObject, { IItemWithId } from './convert-array-to-object';

describe('convertArrayToObject', () => {
  for (const testCaseArgs of [
    ['as number', [{ id: 1 }, { id: 2 }], { '1': { id: 1 }, '2': { id: 2 } }],
    [
      'as string',
      [{ id: '1' }, { id: '2' }],
      { '1': { id: '1' }, '2': { id: '2' } },
    ],
  ]) {
    it(
      'should convert array to object with "id" field ' + testCaseArgs[0],
      () => {
        const result = convertArrayToObject(testCaseArgs[1] as IItemWithId[]);

        expect(result).toStrictEqual(testCaseArgs[2]);
      },
    );
  }
});
