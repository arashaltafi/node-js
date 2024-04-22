const express = require('express')
const { client } = require('./uploadLiara');
const { generateRandomNumber } = require('./Helper');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const app = express()
const port = 8080

app.use(express.json())

app.post('/uploadImage', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image) {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا عکس خود را ارسال نمایید'
            })
        }
        if (typeof image !== 'string') {
            return res.status(400).send({
                state: 'err',
                message: 'لطفا عکس را به صورت رشته ارسال نمایید'
            })
        }

        const imageName = `${Date.now()}_${generateRandomNumber()}.png`;
        const binaryData = Buffer.from(image, 'base64');

        const paramsSet = {
            Body: binaryData,
            Bucket: "upload-arash",
            Key: imageName,
        };

        const paramsGet = {
            Bucket: "upload-arash",
            Key: imageName,
        };

        try {
            await client.send(new PutObjectCommand(paramsSet));
            const command = new GetObjectCommand(paramsGet);
            getSignedUrl(client, command).then((url) => {
                return res.status(200).send({
                    state: 'ok',
                    message: 'عملیات موفق',
                    data: {
                        previewLink: `https://upload-arash.storage.iran.liara.space/${imageName}`,
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