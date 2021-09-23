type Id = number | string;

export interface IItemWithNameAndId {
  id: Id;
  name: string;
}

const findItemInArrByName = (
  arr: IItemWithNameAndId[],
  name: string,
): IItemWithNameAndId | undefined =>
  arr.find((item: IItemWithNameAndId) => item.name === name);

const findItemInArrById = (
  arr: IItemWithNameAndId[],
  id: Id,
): IItemWithNameAndId | undefined =>
  arr.find((item: IItemWithNameAndId) => item.id === id);

export { findItemInArrById, findItemInArrByName };
