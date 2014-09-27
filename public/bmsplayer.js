var makeRequest = function() {
  var _request = new XMLHttpRequest();
  var _url = "http://localhost:3000/playlist"

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

var makePostRequest = function(params) {
  var http = new XMLHttpRequest();
  var url = "http://localhost:3000/song";
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

  playlist.forEach(function(song) {
    var isPresent = false;
    if (liElm.length) {
      for (var i = 0; i < liElm.length; i++) {
        if (liElm.item(i).innerHTML === song.name) {
          isPresent = true;
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
      }
      if (song.state === 'played') {
        li.classList.add('played');
      }
    } else {
      // Update playlist
    }
  });
};

var addSongBtn = document.querySelector('#addSong'),
  songSrc = document.querySelector('#songSrc');

addSongBtn.onclick = function(e) {
  var params = {
    src : songSrc.value
  }

  makePostRequest(params);
}
