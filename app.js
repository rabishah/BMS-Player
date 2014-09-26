/* npm modules */
var express = require('express'),
  path = require('path'),
  Player = require('player');

/* utility */
var songs = require('./utilities/songs.json'),
    BMSPlayer = require('./utilities/bms_player.js');

var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('/songs/list', function(req, res) {
  res.send(songsList);
});

/* server running */
var server = app.listen(3000, function()  {
  console.log('Listening on %d', 3000);
});

/* run player */
var _bmsPlayer = new BMSPlayer(songs.list);
