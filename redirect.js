var pattern = new UrlPattern('(http(s)\\://)(:subdomain.):domain.:tld(/*)');

chrome.extension.onRequest.addListener(function(request, sender) {
  var domain = pattern.match(sender.url);
  // console.log(request);
  // console.log(sender);
  //   if (sender.url.match("http://www.netflix.com/browse")){
  //     chrome.tabs.update(sender.tab.id, {url: request.redirect});
  //   }
      for (var site in GB.getBlockedSites()) {
        if (sender.url.match(site)) {
            chrome.tabs.update(sender.tab.id, {url: request.redirect});
        }
    }
});