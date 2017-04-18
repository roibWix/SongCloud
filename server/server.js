// console.info('hello world', __dirname);


// server.js

// BASE SETUP
// ==============================================

const express = require('express');
const app     = express();
const port    =   process.env.PORT || 3000;

// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.get('/playlists', function(req, res) {
  // res.send('this is a sample!');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  res.sendFile(__dirname + '/roi.json');



});




// we'll create our routes here

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);
