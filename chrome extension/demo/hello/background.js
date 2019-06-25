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
  chrome.alarms.create('alarms1', {
    delayInMinutes: 1,
    periodInMinutes: 1
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
  chrome.contentSettings.images.set({
    primaryPattern: '*://*.baidu.com/*',
    setting: 'allow'
  })
  chrome.contentSettings.javascript.set({
    primaryPattern: '*://*.baidu.com/*',
    setting: 'allow'
  })
  chrome.contentSettings.plugins.getResourceIdentifiers(function (resourceIdentifiers) {
    console.log(resourceIdentifiers)
    resourceIdentifiers.forEach(item => {
      if (item.id === 'adobe-flash-player') {
        chrome.contentSettings.plugins.set({
          primaryPattern: '*://*.douyu.com/*',
          resourceIdentifier: item,
          setting: 'block'
        },function (result) {
          console.log(11111111, result)
        })
      }
    })
  })
});

chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab)
})
