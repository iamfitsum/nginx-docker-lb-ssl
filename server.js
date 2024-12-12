const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const appName = process.env.APP_NAME || 'MasterBirama';

app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Request for '/' served by ${appName}`);
});

// Serve courses.html for /courses
app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, 'courses.html'));
    console.log(`Request for '/courses' served by ${appName}`);
});

// Serve about.html for /about
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
      console.log(`Request for '/about' served by ${appName}`);
});

// Handle 404 errors (optional)
app.use((req, res) => {
  res.status(404).send("404: Not Found");
});


app.listen(port, () => {
    console.log(`${appName} is listening on port ${port}`);
});