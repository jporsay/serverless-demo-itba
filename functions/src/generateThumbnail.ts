import * as functions from 'firebase-functions';
import * as path from 'path';
import * as sharp from 'sharp';
import * as admin from 'firebase-admin';

const THUMB_MAX_WIDTH = 200;
const THUMB_MAX_HEIGHT = 200;

export default functions.storage.object().onFinalize((object) => {
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;

    if (!contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return null;
    }

    const fileName = path.basename(filePath);
    if (fileName.startsWith('thumb_')) {
        console.log('Already a Thumbnail.');
        return null;
    }

    const bucket = admin.storage().bucket(fileBucket);
    const metadata = {contentType: contentType};
    const thumbFileName = `thumb_${fileName}`;
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
    const thumbnailUploadStream = bucket.file(thumbFilePath).createWriteStream({metadata});

    const pipeline = sharp();
    pipeline
        .resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT)
        .crop(sharp.strategy.entropy)
        .pipe(thumbnailUploadStream);

    bucket.file(filePath).createReadStream().pipe(pipeline);

    const streamAsPromise = new Promise((resolve, reject) =>
        thumbnailUploadStream.on('finish', resolve).on('error', reject)
    );

    return streamAsPromise.then(() => {
        console.log('Thumbnail created successfully');
        return null;
    });
});
