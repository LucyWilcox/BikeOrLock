var port = chrome.runtime.connect({name:"redirect"}); //open of a port

// chrome.extension.onRequest.addListener(function(request, sender) {
//   var tabUrl = sender.tab.url;
//   var textUrl = tabUrl.toString();
//   chrome.runtime.onConnect.addListener(function(port){
//     port.postMessage({"url" : textUrl}); //send message into port as chosenDistance, used in content.js
//   });

// });

  var tabUrl = sender.tab.url;
  var textUrl = tabUrl.toString();
  chrome.runtime.onConnect.addListener(function(port){
    port.postMessage({"url" : textUrl}); //send message into port as chosenDistance, used in content.js
  });