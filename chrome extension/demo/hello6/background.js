chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tab) {
    console.log(tab)
  })
  chrome.system.storage.getInfo(function (info) {
    console.log(info)
  })
  chrome.storage.sync.set({'test': 'test'}, function() {
    console.log('save!!')
  });
  chrome.storage.sync.get(['test'], function(result) {
    console.log(result)
  });
  // chrome.sessions.getRecentlyClosed({}, function (sessions) {
  //   console.log(sessions)
  //   chrome.sessions.restore(sessions[0].sessionId, function (restoredSession) {
  //     console.log(restoredSession)
  //   })
  // })
  // chrome.notifications.create({
  //   type: "list",
  //   title: "主要标题",
  //   message: "要显示的主要消息",
  //   iconUrl: "icon.png",
  //   items: [{ title: "Item1", message: "这是项目一。"},
  //     { title: "Item2", message: "这是项目二。"},
  //     { title: "Item3", message: "这是项目三。"}]
  // }, function (id) {
  //   console.log(id)
  // })
  // chrome.notifications.create({
  //   type: "basic",
  //   title: "主要标题",
  //   message: "要显示的主要消息",
  //   iconUrl: "icon.png"
  // }, function (id) {
  //   console.log(id)
  // })
  chrome.management.getAll(function (extensions) {
    console.log(extensions)
  })
})
chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: 'hello'
    }, function (response) {
      console.log('sendMessage response', response)
    })
  })
})
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse)
  sendResponse({
    message: 'get click'
  })
})
chrome.tabs.onDetached.addListener(function (tabId ,tab) {
  console.log(tabId, tab)
})

chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (message) {
    console.log('get long message', message)
    if (message === 'send my message') {
      port.postMessage('my long message')
    }
  })
})
