if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === 'generateThumbnail') {
    exports.generateThumbnail = require('./generateThumbnail').default;
}
