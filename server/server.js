const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const PORT = 3000;
const db = require('./queries');

app.use(bodyParser.json());

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

app.get('/food', db.getFoods);
app.get('/food/:id', db.getFoodById);
app.post('/food', db.createFood);
app.put('/food/:id', db.updateFood);
app.delete('/food/:id', db.deleteFood);

app.listen(PORT, () => console.log(`listening on ${PORT}`));