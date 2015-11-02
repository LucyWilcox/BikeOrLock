var chosenDistance = 0;
var port = chrome.runtime.connect({name:"options"});
//document.getElementById('distance').defaultValue = chosenDistance.toString();

function validateForm() {
    var distanceString = document.getElementById("distance").value;
    var distance = parseInt(distanceString);
    //console.log(typeof distance);
    if (isNaN(distance) === true) {
        alert("Distance must be filled out");
        return false;
    }
    else {
      //chosenDistance = distance;
      //localStorage["ChosenDistance"] = distance;
      //alert(localStorage["ChosenDistance"]);
      chrome.runtime.onConnect.addListener(function(port){
        port.postMessage({chosenDistance:distance});
      });
    }
}
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("setDistance").addEventListener("click", validateForm);
});

