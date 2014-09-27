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
