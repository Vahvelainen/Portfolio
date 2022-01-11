const express = require('express');
const { dirname } = require('path');
const path = require('path')

const app = express();

//Static folder works for stuff
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'robots.txt'));
});
app.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'sitemap.xml'));
});

//Every path to Index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server is doing its thing...'));