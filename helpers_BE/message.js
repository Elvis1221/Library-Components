const TELEGRAM_MSG_MAX_LENGTH = 4096;

const formatTelegramMessage = (msgStart = '', msgBody = '', msgEnd = '') => {
    const bodyMaxLength = TELEGRAM_MSG_MAX_LENGTH - msgStart.length - msgEnd.length;
    const formattedBody = (msgBody || '').slice(0, bodyMaxLength);
    const message = `${msgStart}${formattedBody}${msgEnd}`;

    return message;
};

module.exports = {
    formatTelegramMessage,
};
