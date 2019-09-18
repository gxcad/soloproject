const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

const PORT = 3000;

const sampleData = [
  {name: 'Ken', hobby: 'winning'},
  {name: 'John', hobby: 'sleeping'},
  {name: 'Suzie', hobby: 'eating'},
];
// const sampleData = 'string';

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
})

app.post('/coolRoute', (req, res) => {
  res.json({foodData: req.body});
})

app.post('/', (req, res) => {
  // const append = req.body.input
  // res.send()
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));