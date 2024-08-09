require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Start Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});