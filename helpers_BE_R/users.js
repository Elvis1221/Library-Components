const userFullName = user => {
  const a = [];
  if (user.first_name) {
    a.push(user.first_name);
  }
  if (user.last_name) {
    a.push(user.last_name);
  }
  if (a.length < 1) {
    if (user.email) {
      a.push(user.email);
    } else {
      a.push(user.id);
    }
  }
  return a.join(' ');
};

export { userFullName };
