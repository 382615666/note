chrome.webRequest.onBeforeRequest.addListener(function (details) {
  console.log('onBeforeRequest', details)
  return {
    cancel: true
  }
}, {
  urls: ["*://*.baidu.com/*.png*"]
},
['blocking'])

chrome.webRequest.onBeforeSendHeaders.addListener(function (request) {
  console.log('onBeforeSendHeaders', request)
    request.requestHeaders.push({
    name: 'test',
    value: 'test'
  })
  return {
    requestHeaders: request.requestHeaders
  }
}, {
    urls: ["*://*.baidu.com/*"]
  },
['blocking', 'requestHeaders'])

chrome.webRequest.onSendHeaders.addListener(function (request) {
  console.log('onSendHeaders', request)
  request.requestHeaders.push({
    name: 'aa',
    value: 'bb'
  })
}, {
    urls: ["*://*.baidu.com/*"]
  },
['requestHeaders'])

chrome.webRequest.onHeadersReceived.addListener(function (response) {
  console.log('onHeadersReceived', response)
  response.responseHeaders.push({
    name: 'Access-Control-Allow-Origin',
    value: '*'
  })
  return {
    responseHeaders: response.responseHeaders
  }
}, {
    urls: ["*://*.baidu.com/*"]
  },
['blocking','responseHeaders']);

chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
  console.log('onBeforeNavigate', details)
})

chrome.runtime.onInstalled.addListener(function () {
  // chrome.tts.speak('先说这句话。');
  // chrome.tts.speak('等第一句话完成后再说这句话。', {'enqueue': true});
  chrome.topSites.get(function (data) {
    console.log('topSites', data)
  })
})
