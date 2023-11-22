const express = require('express');
const multer = require('multer');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'photoDB';

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle photo upload and save to MongoDB
app.post('/upload', upload.single('photo'), async (req, res) => {
    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);

        // Insert the photo into the 'photos' collection
        const result = await db.collection('photos').insertOne({ photo: req.file.buffer });

        // Close the MongoDB connection
        client.close();

        res.send('Photo uploaded successfully. Photo ID: ' + result.insertedId);
    } catch (error) {
        console.error('Error uploading photo to MongoDB:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
