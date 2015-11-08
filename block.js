var bikenchill = "http://bikenchill.weebly.com/";
var lastDistance = 0;
var port = chrome.runtime.connect({name:"block"}); // magic to me, opens a port to get stuff sets in options

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
  lastDistance = lastResponse.rotations; // gets the distance of the last object of the json
}

function getSettings(callback){
  port.onMessage.addListener(function(message,sender){
    var setDistance = message.chosenDistance;
    var response = setDistance;
    callback(response); //respones is the chosenDistance set in options recived through the port
  });
}

getSettings(function(response){ 
  minDistance = response;
  if (response !== null){ // check to see if a distance is set
    localStorage.setItem("minDistance", minDistance); // store it locally so it is 'saved' by the user
  }
});

function reDirect(){
  minDistance = localStorage.getItem("minDistance");
  if (lastDistance < minDistance){
    chrome.extension.sendRequest({redirect: bikenchill}); // send message to redirect  
  }
}

reDirect();