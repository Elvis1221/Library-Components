import config from 'config';

import { userFullName } from './users';

const buildEmailPerson = (user, isPrivate = false, useNoreply = false) => {
  const userName = userFullName(user);

  if (useNoreply) {
    return {
      name: userName,
      email: config.emails.default_no_reply_from,
    };
  }

  if (isPrivate && user.account) {
    let name;

    if (user.account.carrier) {
      const carrierName = user.account.carrier.name;
      name = userName ? `${userName} from ${carrierName}` : carrierName;
    } else if (user.account.shipper) {
      name = `STY | ${userName}`;
    }

    return {
      name,
      email: config.emails.default_no_reply_from,
    };
  }
  return {
    name: userName,
    email: user.email,
  };
};

export { buildEmailPerson };
