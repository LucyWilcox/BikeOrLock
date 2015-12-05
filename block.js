var bikenchill = "http://bikechill.herokuapp.com/dashboard";

function checkBlocking(domain){
  var blockedSites = localStorage.getItem("blockedSites");
  var blockedList = blockedSites.split(',');
  if (blockedList.indexOf(domain) > -1){
    chrome.extension.sendRequest({redirectsite: bikenchill});
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

function checkURL(url){
  var webPattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  var site = webPattern.match(url);
  var domain = site.domain;
  console.log(domain);
  checkBlocking(domain);
}

chrome.runtime.onMessage.addListener(
  function(message, sender){
    checkURL(message.url);
  });
