

function getData(callback){
  var url = "https://peaceful-reef-6842.herokuapp.com/bikeSession?&format=json&jsoncallback=?";
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",url,false);
    Httpreq.onload = function()
    {
      var response = Httpreq.responseText;
      //console.log(response);
      callback(response);
    };
  Httpreq.send(null);

  //$.getJSON("https://peaceful-reef-6842.herokuapp.com/bikeSession?&format=json&jsoncallback=?", function(data) {
  //console.log(data);
//});
}

getData(function(response){
  console.log(response);
});

// function readTextFile(callback){
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", "test.txt", false);
//     rawFile.onload = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status === 0)
//             {
//                 var allText = rawFile.responseText;
//                 //return allText;
//                 //console.log(allText);
//                 callback(allText);
//                 //alert(allText);
//             }
//         }
//     };
//     rawFile.send(null);
// }

// readTextFile(function(allText){
//   console.log(allText);
// });

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

