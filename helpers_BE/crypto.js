const config = require('config');
const crypto = require('crypto');

const { secretKey, iv } = config.customerAuth;
const algorithm = 'aes-256-ctr';

/**
 * @param {string} text
 */
const encryptValue = text => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex');
};
exports.encryptValue = encryptValue;

/**
 * @param {string} hash
 */
const decryptValue = hash => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

    return decrypted.toString();
};
exports.decryptValue = decryptValue;
