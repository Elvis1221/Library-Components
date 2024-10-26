const AvatarGenerator = require('initials-avatar-generator').AvatarGenerator;

const colours = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#0277BD', '#FF9800', '#FF5722', '#795548',
    '#FF3D00', '#FF5252', '#D500F9', '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', '#1DE9B6'];

const avatarGenerator = new AvatarGenerator();

const buildAccountLogo = account => {
    const { shipper, carrier } = account || {};

    if (shipper && shipper.id) {
        return shipper.logo_img;
    }

    if (carrier && carrier.id) {
        return carrier.logo_img;
    }

    return '';
};

module.exports = {

    /**
     * @param res pipe It to output, or maybe a file?
     * @param initials String
     * @param size Int
     */
    letterAvatar(res, initials, size = 120) {
        const initialsStr = initials.toUpperCase();

        const option = {
            width: size,
            text: initialsStr,
            color: colours[initialsStr.codePointAt(0) - 65],
        };
        avatarGenerator.generate(option, image => {
            image // image is ImageMagick object - you can do whatever you want with it!
                .stream('png') // make a stream out of it
                .pipe(res);
        });
    },

    buildAccountLogo,
};
