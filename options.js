var chosenDistance = 0;
var port = chrome.runtime.connect({name:"options"}); //open of a port

function validateDistance() {
    var distanceString = document.getElementById("distance").value;
    var distance = parseInt(distanceString); // this parseInt does have limitations...
    if (isNaN(distance) === true) { // check if number was entered
        alert("Distance must be filled out");
        return false;
    }
    else {
      chrome.runtime.onConnect.addListener(function(port){
        port.postMessage({chosenDistance:distance}); //send message into port as chosenDistance, used in content.js
      });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("setDistance").addEventListener("click", validateDistance);
});


function addSite() {
    var newSite = document.getElementById("distance").value;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("addSite").addEventListener("click", validateForm);
});

function getBlockedSites(){
  return ["http://www.netflix.com/*"];
}


var SM = (function () {

    var my = {};

    my.get = function (key) {
        return localStorage.getItem(key);
    };


    return my;

}());

var GB = (function (SM) {
    var my = {};

    my.blockTheseSites = {
        "gawker.com"        : "Gawker Media",
        "io9.com"           : "SciFi Blog",
        "gizmodo.com"       : "Gadget Blog",
    };

    if (!SM.get("blocklist")) {
        SM.put("blocklist", JSON.stringify(my.blockTheseSites));
    }

    my.getBlockedSites = function () {
        return JSON.parse(SM.get("blocklist"));
    };


    my.addBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        my.blockedSites[site] = "Custom Add";
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    };

    my.removeBlockedSite = function (site) {
        my.blockedSites = JSON.parse(SM.get("blocklist"));
        delete my.blockedSites[site];
        SM.put("blocklist", JSON.stringify(my.blockedSites));
    };

    return my;
}(SM));