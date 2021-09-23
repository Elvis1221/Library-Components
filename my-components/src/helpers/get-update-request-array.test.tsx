import { getUpdatedRequestArray } from 'helpers/get-update-request-array';
import { strict as assert } from 'assert';

describe('getUpdatedRequestArray', () => {
  const currentArray = [
    {
      id: '1',
      array: [],
      resultArray: ['1'],
    },
    {
      id: '1',
      array: ['1'],
      resultArray: [],
    },
  ];

  currentArray.forEach(({ id, array, resultArray }) => {
    it(`should returns new array according the passed id`, () => {
      assert.deepEqual(getUpdatedRequestArray(id, array), resultArray);
    });
  });
});
