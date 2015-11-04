var chosenDistance = 0;
var port = chrome.runtime.connect({name:"options"}); //open of a port

function validateForm() {
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
    document.getElementById("setDistance").addEventListener("click", validateForm);
});

