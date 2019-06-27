document.body.style.background = "yellow"

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('onMessage', request, sender, sendResponse)
  document.body.style.background = "red"
  sendResponse({
    message: 'get message, hello'
  })
})


document.body.addEventListener('click', function () {
  chrome.runtime.sendMessage({
    message: 'click body'
  },function (response) {
    console.log(response)
  })
})


let port = chrome.runtime.connect({
  name: 'long connect'
})
port.onMessage.addListener(function (message) {
  if (message === 'my long message') {
    console.log(message)
    port.postMessage('send message end')
  }
})
port.postMessage('send my message')
