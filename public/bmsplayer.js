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
  var playlistElm = document.querySelector('#playlist');
  playlist.forEach(function(song) {
    var li=document.createElement('li');
    playlistElm.appendChild(li);
    li.innerHTML = song.name;
  });
};
