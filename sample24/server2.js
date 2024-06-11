const express = require('express')
const multer = require('multer');
const app = express()
const port = 8080
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { client } = require('./uploadLiara');

// Create an instance of express
app.use(express.json())

// Set up multer for file upload in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                state: 'ok',
                message: 'No file uploaded.'
            });
        }

        if (!req.file.originalname) {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا فایل خود را ارسال نمایید'
            })
        }

        if (typeof req.file.originalname !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا فایل را به صورت رشته ارسال نمایید'
            })
        }

        const fileName = `${Date.now()}_${req.file.originalname}`;
        const binaryData = req.file.buffer;

        const paramsSet = {
            Body: binaryData,
            Bucket: "upload-arash",
            Key: fileName,
        };

        const paramsGet = {
            Bucket: "upload-arash",
            Key: fileName,
        };

        try {
            await client.send(new PutObjectCommand(paramsSet));
            const command = new GetObjectCommand(paramsGet);
            getSignedUrl(client, command).then((url) => {
                return res.status(200).send({
                    state: 'ok',
                    message: 'عملیات موفق',
                    data: {
                        previewLink: `https://upload-arash.storage.iran.liara.space/${fileName}`,
                        downloadLink: url,
                    }
                });
            }).catch((error) => {
                return res.status(400).send({
                    state: 'err',
                    message: 'خطا در انجام عملیات',
                    error: error.message
                })
            });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                state: 'err',
                message: 'خطا در انجام عملیات',
                error: error.message
            })
        }
    } catch (error) {
        return res.status(500).send({
            state: 'err',
            message: 'خطا در انجام عملیات',
            error: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`server is running at port ${port} ...`)
})