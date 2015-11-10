// var port = chrome.runtime.connect({name:"redirect"});

// function getPattern(callback){
//   port.onMessage.addListener(function(message,sender){
//     var pattern = message.pattern;
//     callback(response);
//   });
// }

// getPattern(function(response){ 
//   pattern = response;
//   if (response !== null){ // check to see if a distance is set
//     localStorage.setItem("pattern", pattern); // store it locally so it is 'saved' by the user
//   }
// });

chrome.extension.onRequest.addListener(function(request, sender) {
  //localStorage.geetItem("pattern", pattern);
  //var pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');
  // var domain = pattern.match(sender.url);
  // console.log(domain);
  // console.log(sender);
  //   if (sender.url.match("http://www.netflix.com/browse")){
  //     chrome.tabs.update(sender.tab.id, {url: request.redirect});
  //   }
      //for (var site in GB.getBlockedSites()) {
        //if (domain === "netflix") {
            chrome.tabs.update(sender.tab.id, {url: request.redirect});
        //}
   // }
});