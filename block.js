var bikenchill = "http://bikechill.herokuapp.com/dashboard";
var port = chrome.runtime.connect({name:"block"}); // magic to me, opens a port to get stuff sets in options

function checkBlocking(domain){
  var blockedSites = localStorage.getItem("blockedSites");
  var blockedList = blockedSites.split(',');
  console.log(blockedList);
  if (blockedList.indexOf(domain) > -1){
    console.log("hi");
    chrome.extension.sendRequest({end: bikenchill});
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
  // getURL();
});

function checkURL(url){
  var webPattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  var site = webPattern.match(url);
  var domain = site.domain;
  console.log(domain);
  checkBlocking(domain);
}

chrome.runtime.onMessage.addListener(
  function(message, sender){
    console.log(message);
  });

// port.onMessage.addListener(function(message,sender){
//     url = message.url;

//     console.log(url);
//     chrome.runtime.onConnect.addListener(function(port){
//       port.postMessage({"url" : null}); //send message into port as chosenDistance, used in content.js
//     });
//     // port.postMessage({"url" : null});

//   });

// function getURL(callback){
//   port.onMessage.addListener(function(message,sender){
//     url = message.url;
//     // console.log(sender);
//     // console.log(message);
//     if(url != localStorage.getItem("url")){
//       callback(url);
//     }
//     // localStorage.setItem("url", url);
//     // console.log(url);
//     // localStorage.setItem("url", url);
//     // if (message.url){
//     //   // checkURL(url);
//     // }
//     // checkURL(url);
//   });
// }

// getURL(function(response){
//   var url = response;
//   localStorage.setItem("url", url);
//   console.log(url);
//   // checkURL(url);
// });

// getURL();
// getURL();
// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

// var url = localStorage.getItem("url");
//   for(var i = 0; i< 5; i++){
//     getURL();
//     var url = localStorage.getItem("url");
//     console.log(url);
//     sleep(1000);
//   }

