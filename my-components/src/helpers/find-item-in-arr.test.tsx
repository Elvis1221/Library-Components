import faker from 'faker';
import {
  findItemInArrById,
  findItemInArrByName,
  IItemWithNameAndId,
} from './find-item-in-arr';

describe('findItemInArr', () => {
  const testArray: IItemWithNameAndId[] = [
    { id: 1, name: faker.lorem.sentence(3) },
    { id: 2, name: faker.lorem.sentence(3) },
  ];

  [
    {
      message: 'item with a passed name',
      name: testArray[0].name,
      resultArray: testArray[0],
    },
    {
      message: "an undefined because a passed name doesn't exist in the array",
      name: 'Test',
      resultArray: undefined,
    },
  ].forEach(({ message, name, resultArray }) => {
    it(`should return ${message}`, () => {
      const result = findItemInArrByName(testArray, name);

      expect(result).toStrictEqual(resultArray);
    });
  });

  [
    {
      message: 'item with a passed id',
      id: testArray[0].id,
      resultArray: testArray[0],
    },
    {
      message: "an undefined because a passed id doesn't exist in the array",
      id: 3,
      resultArray: undefined,
    },
  ].forEach(({ message, id, resultArray }) => {
    it(`should return ${message}`, () => {
      const result = findItemInArrById(testArray, id as number);

      expect(result).toStrictEqual(resultArray);
    });
  });
});
