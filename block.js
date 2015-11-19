var bikenchill = "http://bikechill.herokuapp.com/dashboard";
var port = chrome.runtime.connect({name:"block"}); // magic to me, opens a port to get stuff sets in options
chrome.extension.sendRequest({redirect: bikenchill});

function block(bool){
  if (bool === true){
    chrome.extension.sendRequest({redirect2: bikenchill});
  }
  else{
    chrome.extension.sendRequest({redirect: bikenchill});
  }
}

function checkBlocking(domain){
  var blockedSites = localStorage.getItem("blockedSites");
  var blockedList = blockedSites.split(',');
  if (blockedList.indexOf(domain) > -1){
    // chrome.runtime.onConnect.addListener(function(port){
    //   port.postMessage({"blocking" : true}); //send message into port as chosenDistance, used in content.js
    // });
    console.log(domain);
    block(true);
    //chrome.tabs.update(sender.tab.id, {url: request.redirect});
  }
  else{
    console.log(domain);
    //block(false);
  }
}

function getData(callback){ //hits webapp gets all json that is there
  var url = "https://bikechill.herokuapp.com/userStats?&format=json&jsoncallback=?";
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,false);
    Httpreq.onload = function()
    {
      var response = JSON.parse(Httpreq.responseText);
      callback(response);
    };
  Httpreq.send(null);
}

getData(function(response){ // response is json object
  var blockedSites = response.users.blockedDomains;
  localStorage.setItem("blockedSites" , blockedSites);
});

// function checkDistance(response){
//   var last = response.length - 1;
//   var lastResponse = response[last];
//   lastDistance = lastResponse.rotations; // gets the distance of the last object of the json
// }


function checkURL(url){
  var webPattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  var site = webPattern.match(url);
  var domain = site.domain;
  console.log(domain);
  checkBlocking(domain);
}

function getURL(){
  port.onMessage.addListener(function(message,sender){
    url = message.url;
    localStorage.setItem("url", url);
  });
  var url = localStorage.getItem("url");
  checkURL(url);
  console.log(url);
}

getURL();




//function reDirect(){
//   //minDistance = localStorage.getItem("minDistance");
//   var webPattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
//   // chrome.tabs.query({'active' : true, 'lastFocusedWindow' : true}, function(tabs){
//   //   var url = tabs[0].url;
//   // });
//   // chrome.tabs.getSelected(null,function(tab) {
//   //   var url = tab.url;
//   // });
//   //alert(url);
//   // if (lastDistance < minDistance){
//   //   //alert("redirecting");
//   // chrome.extension.sendRequest({redirect: bikenchill}); // send message to redirect  
//   // }
//   //var url = localStorage.getItem("url");
//   //var urlText = url.toText();
//   //alert(url);
// }
// reDirect();

// curURL(function(response){ 
//   var url = response;
//   if (response !== null){ // check to see if a distance is set
//     localStorage.setItem("url", url); // store it locally so it is 'saved' by the user
//   }
// }); 


// chrome.extension.onRequest.addListener(function(request, sender) {
//   //localStorage.geetItem("pattern", pattern);
//   //var pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
//   // var domain = pattern.match(sender.url);
//   // console.log(domain);
//   console.log(sender);
//     // if (sender.url.match("http://www.netflix.com/browse")){
//     //   chrome.tabs.update(sender.tab.id, {url: request.redirect});
//     // }
//       //for (var site in GB.getBlockedSites()) {
//         //if (domain === "netflix") {
//       //     chrome.tabs.update(sender.tab.id, {url: request.redirect});
//         //}
//   // }
// });


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

  
