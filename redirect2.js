chrome.extension.onRequest.addListener(function(request, sender) {
  //alert("hi");
  // var pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  // alert(pattern);
  // var domain = webPattern.match(sender.url);
  // alert(domain);
  //console.log(domain);
  //console.log(sender.tab.id);
  //alert(sender.tab.url);
  // var tabUrl = sender.tab.url;
  // var textUrl = tabUrl.toString();
  // //alert(textUrl);
  // chrome.runtime.onConnect.addListener(function(port){
  //   port.postMessage({"url" : textUrl}); //send message into port as chosenDistance, used in content.js
  // });
  
  // port.onMessage.addListener(function(message,sender){
  //   var blocking = message.blocking;
  //   alert(blocking);
  // });

  // if (domain === "netflix"){
  chrome.tabs.update(sender.tab.id, {url: request.redirect});
 // }
      // for (var site in GB.getBlockedSites()) {
      //   if (domain === "netflix") {
      //       chrome.tabs.update(sender.tab.id, {url: request.redirect});
      //   }
    //}
});