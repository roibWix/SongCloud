// console.info('hello world', __dirname);


// server.js

// BASE SETUP
// ==============================================

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const bodyParser = require('body-parser');


app.use(cors({
  origin: (origin, callback) => {
    callback(null, true)
  },
  credentials: true
}));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  res.sendFile(__dirname + '/playlists.json');


});
app.post('/Playlists', function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  playlists.push(req.body);
  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  res.send('ok');
});



app.post('/ChangeTitleName', function (req,res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  console.info('newcall', req.body);

  res.send('ok')

});





// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
