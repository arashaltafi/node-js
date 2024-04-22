const { S3Client } = require("@aws-sdk/client-s3");

const client = new S3Client({
    region: "default",
    endpoint: "https://storage.iran.liara.space",
    credentials: {
        accessKeyId: 't3rlitlv7542366k',
        secretAccessKey: '24b0bd3e-01e8-4905-93c8-b057909cbf61'
    },
});

module.exports = {
    client
}