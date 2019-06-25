chrome.runtime.onInstalled.addListener(function() {
  chrome.windows.getAll({}, function (windows) {
    console.log(windows)
  })
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
  console.log(windowId)
})
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.windows.create({
    url: 'http://www.baidu.com'
  }, function (window) {
    console.log(window)
  })
})
