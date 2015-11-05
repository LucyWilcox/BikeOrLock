chrome.tabs.onUpdated.addListener(function() {
    chrome.tabs.executeScript(null, { file: "options.js" });
    chrome.tobs.executeScript(null, { file: "block.js" });
    alert("hi");
});
alert("hii");
