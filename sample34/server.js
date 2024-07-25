// generate xlsx

const express = require('express');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.get('/download-excel', (req, res) => {
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

// http://localhost:5000/generate-excel
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

    // Generate file name with current timestamp in milliseconds
    const fileName = `${Date.now()}.xlsx`;
    const filePath = path.join(__dirname, fileName);

    // Write workbook to file
    XLSX.writeFile(workbook, filePath);

    // Send a response to the client
    res.send(`File has been saved as ${fileName}`);
})

// http://localhost:5000/read-excel?id=1721905889014&name=%D8%AA%D8%B3%D8%AA%20%D9%86%D8%A7%D9%85%201
app.get('/read-excel', (req, res) => {
    // Specify the path to the Excel file
    const filePath = path.join(__dirname, req.query.id + '.xlsx');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Find the item where the Name (نام) is 'تست 1'
    const filteredItem = jsonData.find(item => item['نام'] === req.query.name);

    // Check if the item was found
    if (filteredItem) {
        res.status(200).json(filteredItem);
    } else {
        res.status(200).json(jsonData);
    }
});

// http://localhost:5000/update-excel?id=1721905889014&name=%D8%AA%D8%B3%D8%AA%20%D9%86%D8%A7%D9%85%201
app.get('/update-excel', (req, res) => {
    // Specify the path to the Excel file
    const filePath = path.join(__dirname, req.query.id + '.xlsx');

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Find the item by ID and update its name
    const itemIndex = jsonData.findIndex(item => item['نام'] === req.query.name);

    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }

    jsonData[itemIndex]['نام'] = req.query.newName;

    // Convert the updated JSON back to worksheet
    const updatedWs = XLSX.utils.json_to_sheet(jsonData, { header: ['نام', 'نام خانوادگی', 'سن'] });

    // Replace the old worksheet with the updated one
    workbook.Sheets[sheetName] = updatedWs;

    // Write the updated workbook back to file
    XLSX.writeFile(workbook, filePath);

    // Send a success response
    res.status(200).send('Name updated successfully');
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});