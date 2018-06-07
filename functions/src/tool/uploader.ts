#!/usr/bin/env node

import * as fs from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import * as admin from 'firebase-admin';
import * as Listr from 'listr';
import * as inquirer from 'inquirer'

inquirer.registerPrompt('directory', require('inquirer-select-directory'));

const serviceAccount = require("./serverless-itba-firebase-adminsdk-vlu7v-022836d6b6.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://serverless-itba.firebaseio.com",
    storageBucket: "gs://serverless-itba.appspot.com"
});

inquirer.prompt([
    {
        name: 'rootDir',
        message: 'Images directory:',
        type: 'directory',
        basePath: '/home/qcho/Pictures/sample'
    } as any,
    {
        name: 'userUid',
        message: 'Upload images as (email):',
        default: 'qcho86@gmail.com',
        filter: function (input) {
            const done = this.async();
            admin.auth().getUserByEmail(input)
                .then((user) => done(null, user.uid))
                .catch((e) => done(e))
        },
    },
    {
        name: 'concurrency',
        message: 'Number of concurrent uploads:',
        type: 'number',
        default: 3,
    },
]).then(async answers => {
    const rootDir = answers['rootDir'];
    const userUid = answers['userUid'];
    const concurrency = answers['concurrency'];
    const bucket = admin.storage().bucket();
    const tasks = new Listr([], {concurrent: concurrency});
    for (const file of await fs.readdirSync(rootDir)) {
        const filePath = path.join(rootDir, file);
        try {
            await sharp(filePath, {failOnError: true}).metadata()
            tasks.add({
                title: `Uploading file ${file} ...`,
                task: () => bucket.upload(filePath, {destination: `images/${userUid}/${file}`})
            })
        } catch(e) {
            continue; // ignore non-image file.
        }
    }
    await tasks.run()
    process.exit(0)
}).catch(e => {
    console.error(e)
    process.exit(1)
});
