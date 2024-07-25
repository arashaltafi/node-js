// generate xlsx

const express = require('express');
const XLSX = require('xlsx');

const app = express();
const port = 5000;

app.get('/generate-excel', (req, res) => {
    // Sample JSON data
    const jsonData = [
        ['نام', 'نام خانوادگی', 'سن'],
        ['تست نام 1', 'تست نام خانوادگی 1', 26],
        ['تست نام 2', 'تست نام خانوادگی 2', 27],
        ['تست نام 3', 'تست نام خانوادگی 3', 28],
    ]

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(jsonData)

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'شیت 1');

    // Generate buffer
    const wbout = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set the response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    // Send the buffer to the response
    res.send(wbout);
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});