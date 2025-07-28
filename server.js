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
    const { location, tags } = req.query;

    const needsArray = needs ? needs.split(',').map(n => n.trim().toLowerCase()) : [];

    const filtered = data.filter(entry => {
        const entryLocation = entry.Location.toLowerCase();
        const entryResource = entry.ResourceType.toLowerCase();

        const locationMatch = location ? entryLocation.includes(location.toLowerCase()) : true;

        const needMatch = needsArray.length === 0
            ? true
            : needsArray.some(need => entryResource.includes(need));

        return locationMatch && needMatch;
    });

    res.json(filtered);
});

