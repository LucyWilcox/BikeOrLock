var port = chrome.runtime.connect({name:"end"});

chrome.extension.onRequest.addListener(function(request, sender) {
  chrome.tabs.update(sender.tab.id, {url: request.end});
  var tabUrl = sender.tab.url;
  var textUrl = tabUrl.toString();
  //alert(textUrl);
  chrome.runtime.onConnect.addListener(function(port){
    port.postMessage({"url" : textUrl}); //send message into port as chosenDistance, used in content.js
  });
});