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

function getURL(){
  port.onMessage.addListener(function(message,sender){
    url = message.url;
    localStorage.setItem("url", url);

    // if (message.url){
    //   // checkURL(url);
    // }
    checkURL(url);
  });
  // var url = localStorage.getItem("url");
  // console.log("\n url:");
  // console.log(url);
  // checkURL(url);
}

getURL();

