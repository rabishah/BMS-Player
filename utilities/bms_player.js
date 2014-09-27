var Player = require('player');

function _bmsPlayer(playlist) {
  this.playlist = playlist;
  this.init();
};

_bmsPlayer.prototype = {
  init: function() {
    var list = this.playlist.map(function(song) {
      return song.path;
    });

    /* palyer instance */
    this.player = new Player(list);
    this.play()
  },

  play: function() {
    this.player.play();

    this.player.on('playing',function(item){
      console.log('im playing... src:' + JSON.stringify(item));
      this.playlist[item['_id']].state = 'playing';
    }.bind(this));

    this.player.on('playend',function(item){
      console.log('src:' + JSON.stringify(item) + ' play done, switching to next one ...');
      this.playlist[item['_id']].state = 'played';
    }.bind(this));

    this.player.on('error', function(err){
      console.log(err);
    });
  },

  next: function() {
    this.player.next();
  },

  stop: function() {
    this.player.stop();
  },

  add: function(song) {
    var _newSong = {
      "id": this.playlist.length,
      "name": song.name,
      "artist": song.artist,
      "path": song.src,
      "state": "0"
    };

    /* update playlist */
    this.playlist.push(_newSong);
    /* queue player */
    this.player.add(song.src);
  },

  getPlaylist: function() {
    return this.playlist;
  },

  upvote: function(songId) {
    console.log('song id', songId);
  }
};

module.exports = exports = _bmsPlayer;
