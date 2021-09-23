import { INamedObjectWithId } from 'model/common';

const findItemInArrByName = (
  arr: INamedObjectWithId[],
  name: string,
): INamedObjectWithId | undefined =>
  arr.find((item: INamedObjectWithId) => item.name === name);

export default findItemInArrByName;
