// pdf generator
// npm install express pdfkit body-parser

const express = require('express');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;
const axios = require('axios');

// Middleware to parse JSON body with increased limit
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/generate-pdf', async (req, res) => {
    const { text, imageUrl, imageBase64, type } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        // Create a document
        const doc = new PDFDocument();

        // Pipe the document to a buffer to send as response
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            const base64Pdf = pdfData.toString('base64');
            if (type === 'base64') {
                res.status(200).send({
                    base64Pdf: base64Pdf
                })
            } else {
                res
                .writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfData),
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment;filename=generated.pdf',
                })
                .end(pdfData);
            }
        });

        // Add text with styles
        doc
            .font('Helvetica-Bold')
            .fontSize(20)
            .text('User Provided Text:', {
                underline: true,
            });

        doc
            .moveDown()
            .font('Helvetica')
            .fontSize(14)
            .text(text, {
                align: 'justify',
            });

        if (imageUrl) {
            // Fetch the image from the URL
            const response = await axios({
                url: imageUrl,
                responseType: 'stream',
            });

            // Add Image Url
            const imageStream = response.data;
            const imageBuffer = await streamToBuffer(imageStream);

            // Add image to PDF
            doc.image(imageBuffer, {
                fit: [500, 400],
                align: 'center',
                valign: 'center',
            });
        } else if (imageBase64) {
            // Add Image Base64
            const imagePath = path.resolve(__dirname, 'temp_image.jpg');
            const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64');
            fs.writeFileSync(imagePath, imageBuffer);

            // Add image to PDF
            doc.image(imagePath, {
                fit: [500, 400],
                align: 'center',
                valign: 'center',
            });
        }

        // Finalize the PDF and end the stream
        doc.end();
    } catch (error) {
        console.error('Error fetching the image:', error);
        res.status(500).json({ error: 'Failed to fetch the image' });
    }
});

// Utility function to convert stream to buffer
const streamToBuffer = async (readableStream) => {
    const chunks = [];
    for await (const chunk of readableStream) {
        chunks.push(chunk);
    }
    return Buffer.concat(chunks);
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});