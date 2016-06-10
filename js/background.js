/*  
	Handle browser communication
*/
chrome.extension.onConnect.addListener(function(port) {
  sendOptionToContent(port.name);
});

function sendOptionToContent(option){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message":option});
  });
}

chrome.runtime.onMessage.addListener(
  
  function(request, sender, sendResponse) {
    
    var id = 100;
    if( request.message === "open_new_tab") {
      
      chrome.tabs.captureVisibleTab(function(screenshotUrl) {
          var viewTabUrl = chrome.extension.getURL('index.html?id=' + id++)
          var targetId = null;

          chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            if (tabId != targetId || changedProps.status != "complete")
              return;
            chrome.tabs.onUpdated.removeListener(listener);
            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
              var view = views[i];
              console.log(view)
              if (view.location.href == viewTabUrl) {
                view.setScreenshotUrl(screenshotUrl);
                break;
              }
            }
          });

          chrome.tabs.create({url: viewTabUrl}, function(tab) {
              targetId = tab.id;
          });
      });
    }
  }
);
