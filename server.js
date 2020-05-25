const express = require('express');
const bodyParser = require('body-parser');

const logic = require('./src/logic.js');
let G = null;

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start new game
app.post('/api/newgame', (req, res) => {
  res.send({ express: 'new game' });
  console.log(req.originalUrl);
  G = new logic();
});

// Handle move
app.post('/api/move', (req, res) => {
  console.log(req.originalUrl);
  console.log(req.body.move);

  let idx = req.body.move

  if (G.isEmpty(idx)) {
    res.send({ invalid: false, win: G.setMove(idx) });
  } else {
    // Illegal move
    res.send({ invalid: true, win: false });
  }
});

// Get vcf options
app.post('/api/vcf', (req, res) => {
  console.log(req.originalUrl)

  let positions = [];

  let evalboard = new logic();
  evalboard.array = G.array
  evalboard.history = G.history

  for(i=0; i < evalboard.array.length; i++) {
    if(evalboard.isEmpty(i)) {
      if(evalboard.setMove(i))
        positions.push(i)
      evalboard.removeMove(i)
    }
  }
  res.send({ positions: positions });
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send({ express: req.body.username });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
