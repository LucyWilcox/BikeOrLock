var chosenDistance = 0;
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
      localStorage.chosenDistance = distance;
      console.log(distance);
    }
}
function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("setDistance").addEventListener("click", validateForm);
});

