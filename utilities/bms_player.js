var Player = require('player');

function _bmsPlayer(songsList) {
  this.songsList = songsList;
  this.init();
};

_bmsPlayer.prototype = {
  init: function() {
    var list = this.songsList.map(function(song) {
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
    });

    this.player.on('playend',function(item){
      console.log('src:' + JSON.stringify(item) + ' play done, switching to next one ...');
    });

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

  add: function() {
    // add another song to playlist
    this.player.add('http://someurl.com/anothersong.mp3');
  },

  getList: function() {
    return this.player.playlist();
  },

  upvote: function(songId) {
    console.log('song id', songId);
  }
};

module.exports = exports = _bmsPlayer;
