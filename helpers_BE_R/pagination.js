/**
 * Function for calculating parameters for pagination
 * @param inputLimit {number | null} - Limit
 * @param inputOffset {number | null} - Offset
 * @returns {{offset: number, limit: (number)}} - Object with parameters
 */
const getPaginationParams = (inputLimit = 100, inputOffset = 0) => {
  return {
    limit: inputLimit <= 100 ? +inputLimit : 100,
    offset: +inputOffset,
  };
};
export {
  getPaginationParams,
};
