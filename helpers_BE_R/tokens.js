import crypto from 'crypto';

const generateToken = () => {
  return crypto.randomBytes(16).toString('hex');
};

export {
  generateToken,
};
