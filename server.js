const express = require('express');
const XLSX = require('xlsx');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

// Load spreadsheet
const workbook = XLSX.readFile('./URI 2nd Copy.xlsx');
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// API endpoint to filter by location and need
app.get('/resources', (req, res) => {
    const { location, need } = req.query;

    const filtered = data.filter(entry => {
        return (
            entry.Location.toLowerCase().includes(location.toLowerCase()) &&
            entry.ResourceType.toLowerCase().includes(need.toLowerCase())
        );
    });

    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
