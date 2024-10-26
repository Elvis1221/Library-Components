export const getSortingQuery = (key, dir, model) => {
  if (!key) {
    return null;
  }

  const sortDir = (dir || '').toUpperCase() || 'ASC';

  if (!['ASC', 'DESC'].includes(sortDir)) {
    return null;
  }

  if (!model.rawAttributes[key]) {
    return null;
  }

  return [`${key}`, sortDir];
};
