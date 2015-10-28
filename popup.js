function validateForm() {
    var x = document.forms["chose"]["site"].value;
    if (x === null || x === "") {
        alert("Name must be filled out");
        return false;
    }
    else {
      console.log(x);
    }
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("setSite").addEventListener("click", validateForm);
});

