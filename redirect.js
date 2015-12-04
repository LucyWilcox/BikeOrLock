var port = chrome.runtime.connect({name:"redirect"}); //open of a port
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.runtime.onConnect.addListener(function(port){
    console.log("redirect");
    port.postMessage({"url" : tab.url}); //send message into port as chosenDistance, used in content.js
  });
}); 
