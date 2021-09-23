export interface IItemWithId {
  id: number | string;
}

type ObjectWithIdIndexes = {
  [index in number | string]: {
    id: number | string;
  };
};

const convertArrayToObject = (arr: IItemWithId[]) => {
  return arr.reduce((acc: ObjectWithIdIndexes, item: IItemWithId) => {
    acc[item.id] = item;
    return acc;
  }, {});
};

export default convertArrayToObject;
