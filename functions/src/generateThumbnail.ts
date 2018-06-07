import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as path from 'path';
import * as sharp from 'sharp';

const THUMB_MAX_WIDTH = 400;
const THUMB_MAX_HEIGHT = 400;

admin.initializeApp();
const firestore = admin.firestore();

interface Image {
    author: {
        name: string,
        uid: string,
        pic: string
    },
    userIdUploader: string,
    imagePath: string,
    thumbPath: string,
    uploadTime: Date,
}

export default functions.storage.object().onFinalize(async (object, context) => {
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
    const thumbFile = bucket.file(thumbFilePath);
    const thumbnailUploadStream = thumbFile.createWriteStream({metadata});

    const pipeline = sharp();
    pipeline
        .rotate()
        .resize(THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT)
        .crop(sharp.strategy.entropy)
        .pipe(thumbnailUploadStream);

    const originalFile = bucket.file(filePath)
    originalFile.createReadStream().pipe(pipeline);

    const streamAsPromise = new Promise((resolve, reject) =>
        thumbnailUploadStream.on('finish', resolve).on('error', reject)
    );

    return streamAsPromise.then(async (result) => {
        console.log('Thumbnail created successfully');
        const config = {
            action: 'read',
            expires: '03-01-2500',
        };
        const user = await admin.auth().getUser(filePath.match('images/(\\w+)/.*')[1]);
        const imageUrl = (await originalFile.getSignedUrl(config))[0];
        const thumbUrl = (await thumbFile.getSignedUrl(config))[0];
        await firestore.collection('images').add({
            author: {
                name: user.displayName,
                uid: user.uid,
                pic: user.photoURL,
            },
            imagePath: imageUrl,
            thumbPath: thumbUrl,
            uploadTime: new Date(object.timeCreated),
        } as Image);
        console.log('Feed record crated successfully');
        return null;
    });
});
