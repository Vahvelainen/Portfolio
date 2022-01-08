const express = require('express');
const { dirname } = require('path');
const path = require('path')

const app = express();

//Static folder works for stuff
app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

//Every path to Index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Server is doing its thing...'));