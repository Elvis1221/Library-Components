import convertToSelectData from './convert-to-select-data';

type testArgs = [
  string,
  [string, string | number | undefined],
  { label: string; value: string },
];

describe('convertToSelectData', () => {
  for (const testCaseArgs of [
    [
      'with label and value',
      ['Test', 'test'],
      { label: 'Test', value: 'test' },
    ] as testArgs,
    [
      'with value as label',
      ['Test', undefined],
      { label: 'Test', value: 'Test' },
    ] as testArgs,
  ]) {
    it('should prepare object to select field ' + testCaseArgs[0], () => {
      const result = convertToSelectData(
        testCaseArgs[1][0],
        testCaseArgs[1][1],
      );

      expect(result).toStrictEqual(testCaseArgs[2]);
    });
  }
});
