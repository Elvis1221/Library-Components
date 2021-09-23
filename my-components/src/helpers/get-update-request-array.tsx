export const getUpdatedRequestArray = (
  id: string,
  selectedRequestIds: string[],
): string[] => {
  const arr = [...selectedRequestIds];
  const index = arr.findIndex((item) => item === id);

  index === -1 ? arr.push(id) : arr.splice(index, 1);

  return arr;
};
