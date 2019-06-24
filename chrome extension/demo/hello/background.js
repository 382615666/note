chrome.runtime.onInstalled.addListener(function() {
  chrome.browserAction.getTitle({}, function (item) {
    console.log(item)
  })
  chrome.browserAction.setTitle({
    title: 'hello extension title'
  })
  chrome.browserAction.getTitle({}, function (item) {
    console.log(item)
  })
  chrome.browserAction.setBadgeText({
    text: 'hello'
  })
  chrome.browserAction.setBadgeBackgroundColor({
    color: '#f00'
  })
  chrome.browserAction.getBadgeText({}, function (item) {
    console.log(item)
  })
  chrome.browserAction.getBadgeBackgroundColor({}, function (item) {
    console.log(item)
  })
  // chrome.browserAction.disable()
  // chrome.browserAction.enable()
  chrome.browserAction.onClicked.addListener(function (tab) {
    console.log(tab)
  })
});
