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
