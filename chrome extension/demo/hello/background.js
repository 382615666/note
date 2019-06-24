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
  chrome.alarms.create('alarms1', {
    delayInMinutes: .2,
    periodInMinutes: .2
  })
  chrome.alarms.get('alarms1', function (alarms) {
    console.log('get alarms')
    console.log(alarms)
  })
  chrome.alarms.onAlarm.addListener(function (alarms) {
    console.log('alarms listener callback')
    console.log(alarms)
  })
  chrome.alarms.clearAll()
});
