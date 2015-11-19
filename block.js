var bikenchill = "http://bikenchill.weebly.com/";
var lastDistance = 0;
var port = chrome.runtime.connect({name:"block"}); // magic to me, opens a port to get stuff sets in options

// function getData(callback){ //hits webapp gets all json that is there
//   var url = "https://peaceful-reef-6842.herokuapp.com/bikeSession?&format=json&jsoncallback=?";
//   var Httpreq = new XMLHttpRequest(); // a new request
//   Httpreq.open("GET",url,false);
//     Httpreq.onload = function()
//     {
//       var response = JSON.parse(Httpreq.responseText);
//       callback(response);
//     };
//   Httpreq.send(null);
// }

// getData(function(response){ // actually call getData
//   checkDistance(response); // and moves on to get the last entry
// });

function checkDistance(response){
  var last = response.length - 1;
  var lastResponse = response[last];
  lastDistance = lastResponse.rotations; // gets the distance of the last object of the json
}

function reDirect(){
  //minDistance = localStorage.getItem("minDistance");
  var webPattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  chrome.tabs.query({'active' : true, 'lastFocusedWindow' : true}, function(tabs){
    var url = tabs[0].url;
  });
  // chrome.tabs.getSelected(null,function(tab) {
  //   var url = tab.url;
  // });
  alert(url);
  // if (lastDistance < minDistance){
  //   //alert("redirecting");
  //   chrome.extension.sendRequest({redirect: bikenchill}); // send message to redirect  
  // }
}

reDirect();

// function getSettings(callback){
//   port.onMessage.addListener(function(message,sender){
//     var setDistance = message.chosenDistance;
//     var response = setDistance;
//     callback(response); //respones is the chosenDistance set in options recived through the port
//   });
// }

// getSettings(function(response){ 
//   minDistance = response;
//   if (response !== null){ // check to see if a distance is set
//     localStorage.setItem("minDistance", minDistance); // store it locally so it is 'saved' by the user
//   }
// });

// function getPattern(callback){
//   port.onMessage.addListener(function(message,sender){
//     var pattern = message.pattern;
//     callback(response);
//   });
// }

// getPattern(function(response){ 
//   pattern = response;
//   alert(pattern);
//   if (response !== null){ // check to see if a distance is set
//     localStorage.setItem("pattern", pattern); // store it locally so it is 'saved' by the user
//   }
// });