/* npm modules */
var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser')
  Player = require('player');

/* utility */
var songs = require('./utilities/songs.json'),
    BMSPlayer = require('./utilities/bms_player.js');

var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

app.get('/', function(req, res) {
  res.render('public/index.html');
});

app.get('/playlist', function(req, res) {
  // /!\ not able to send json object
  res.send(JSON.stringify(_bmsPlayer.getPlaylist()));
});

app.post('/upvote/:id', function(req, res) {
  _bmsPlayer.upvote(req.body.id);
  res.send(201);
});

app.post('/song', function(req, res) {
  _bmsPlayer.add(req.body.src);
  res.send(201);
});

/* server running */
var server = app.listen(3000, function()  {
  console.log('Listening on %d', 3000);
});

/* run player */
var _bmsPlayer = new BMSPlayer(songs.list);
