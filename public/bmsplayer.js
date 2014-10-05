var _playlist = [];

var makeRequest = function() {
  var _request = new XMLHttpRequest();
  var _url = "http://192.168.0.100:3000/playlist"

  _request.open("GET", _url, false);
  // _request.setRequestHeader("User-Agent",navigator.userAgent);
  _request.send(null)

  if (_request.status == 200) {
    list(JSON.parse(_request.responseText));
  }
  else {
    console.log("Error executing XMLHttpRequest call!");
  }
}

var makePostRequest = function(params, url) {
  var http = new XMLHttpRequest();
  http.open("POST", url, true);

  // Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader("Content-length", params.length);
  http.setRequestHeader("Connection", "close");

  http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
      console.log("lets see response", http.responseText);
    }
  }
  http.send(JSON.stringify(params));
}

var list = function(playlist) {
  var playlistElm = document.querySelector('#playlist'),
    liElm = playlistElm.children;

  /* empty current playlist */
  _playlist.length = 0;
  _playlist = playlist;

  playlist.forEach(function(song) {
    var isPresent = false;
    if (liElm.length) {
      for (var i = 0; i < liElm.length; i++) {
        if (liElm.item(i).innerHTML === song.name) {
          isPresent = true;

          /* update list if present */
          if (song.state === 'playing') {
            liElm.item(i).classList.add('selected');
          }
          if (song.state === 'played') {
            liElm.item(i).classList.add('played');
          }
        }
      }
    }

    if (!isPresent) {
      var li=document.createElement('li');
      playlistElm.appendChild(li);
      li.innerHTML = song.name;

      /* add selection style */
      if (song.state === 'playing') {
        li.classList.add('selected');
      } else if (song.state === 'played') {
        li.classList.add('played');
      }
      /* add heart button */
      // li.appendChild(_getUpvoteBtn());
    }
  });
};

var addSongBtn = document.querySelector('#addSong'),
  songSrc = document.querySelector('#songSrc'),
  songName = document.querySelector('#songName'),
  songArtist = document.querySelector('#songArtist');

addSongBtn.onclick = function(e) {
  var params = {
    src: songSrc.value,
    name: songName.value,
    artist: songArtist.value
  };

  makePostRequest(params, "http://192.168.0.100:3000/song");
}

var _getUpvoteBtn = function() {
  var btn = document.createElement('button');
  btn.innerHTML = 'Upvote';
  btn.setAttribute('onclick', 'upvote(event)');
  return btn;
};

var upvote = function(event) {
  var _song = event.srcElement.parentElement.innerText.replace(/Upvote/, '');
  _playlist.forEach(function(song, idx) {
    if (song.name === _song) {
      var params = {
        id: idx
      };

      /* make post request */
      makePostRequest(params, "http://192.168.0.100:3000/upvote" + '/' + idx);
    }
  });
}
