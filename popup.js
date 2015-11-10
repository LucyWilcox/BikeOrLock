function getData(callback){ //hits webapp gets all json that is there
  var url = "https://peaceful-reef-6842.herokuapp.com/bikeSession?&format=json&jsoncallback=?";
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,false);
    Httpreq.onload = function()
    {
      var response = JSON.parse(Httpreq.responseText);
      callback(response);
    };
  Httpreq.send(null);
}

function showDistance(response){
  var distances = response;
  dist = 0;
  for (d in distances) {
    rotations = response[d]["rotations"];
    dist += rotations;
  }
document.getElementById('rotations').innerHTML = dist.toString() + " " + " rotations";
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

getData(function(response){ // actually call getData
  showDistance(response); // and moves on to get the last entry
});

