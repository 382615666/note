chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    type: 'checkbox',
    title: 'checkbox1',
    id: 'checkbox1',
    contexts: ['image']
  })
  chrome.contextMenus.create({
    title: 'parent',
    contexts: ['all'],
    id: 'parent'
  })
  chrome.contextMenus.create({
    title: 'child1',
    parentId: 'parent',
    contexts: ['all'],
    id: 'child1'
  })
  chrome.contextMenus.create({
    title: 'child2',
    contexts: ['all'],
    parentId: 'parent',
    enabled: false,
    id: 'child2'
  })
  chrome.cookies.get({
    url: 'http://baidu.com',
    name: 'BDUSS'
  }, function (cookie) {
    console.log('cookie', cookie)
  })
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log(info, tab)
})
