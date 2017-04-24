// console.info('hello world', __dirname);


// server.js

// BASE SETUP
// ==============================================
const uuid = require('uuid');
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

  res.sendFile(__dirname + '/playlists.json');


});
app.post('/Playlists', function (req, res) {
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  playlists.push(req.body);
  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  res.send('ok');
});


app.post('/ChangeTitleName', function (req, res) {
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  let data = req.body;
  playlists[data.indexOfList].listTitle = data.newTitleValue;
  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  res.send('ok')
});


app.post('/CheckHandler', function (req, res) {
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  let data = req.body;

  if (data.isItChecked === true) {
    //add song to playlist
    playlists[data.indexOfList].songs.push(data.song);
    fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  }

  if (data.isItChecked === false) {
    //remove song from playlist
    let indexOfSong = playlists[data.indexOfList].songs.indexOf(data.song);
    playlists[data.indexOfList].songs.splice(indexOfSong, 1);
    fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  }
  res.send('ok')
});

app.post('/AddNewListWithSong', function (req, res) {
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  let data = req.body;

  let newuuid = uuid();
  let playlist = {
    listid: newuuid,
    listTitle: 'Untitled',
    songs: [data]
  };

  playlists.push(playlist);
  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));
  res.send('ok')

});

app.post('/DeleteList', function (req,res) {
  const playlists = JSON.parse(fs.readFileSync(__dirname + '/playlists.json'));
  let data = req.body;
// console.info(data);
  playlists.splice(data.indexOfList, 1);
  fs.writeFileSync(__dirname + '/playlists.json', JSON.stringify(playlists));

});


// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
