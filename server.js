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

// API endpoint to filter by Location and tags
app.get('/resources', (req, res) => {
    const { Location, Tags } = req.query;

    const TagsArray = Tags ? Tags.split(',').map(n => n.trim().toLowerCase()) : [];

    const filtered = data.filter(entry => {
        const entryLocation = (entry.Location || '').toLowerCase();
        const entryResource = (entry.ResourceType || '').toLowerCase();

        const LocationMatch = Location ? entryLocation.includes(Location.toLowerCase()) : true;

        const TagMatch = TagsArray.length === 0
            ? true
            : TagsArray.some(Tag => entryResource.includes(Tag));

        return LocationMatch && TagMatch;
    });

    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


