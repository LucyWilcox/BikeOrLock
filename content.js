var bikenchill = "http://bikenchill.weebly.com/";
var lastDistance = 0;
var minDistance = 2;

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

getData(function(response){ // actually call getData
  checkDistance(response); // and moves on to get the last entry
});

function checkDistance(response){
  var last = response.length - 1;
  var lastResponse = response[last];
  lastDistance = lastResponse.distance;
  console.log(lastDistance);
}

if (lastDistance < minDistance){
  chrome.extension.sendRequest({redirect: bikenchill}); // send message to redirect  
}
