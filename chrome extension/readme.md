# chrome extension

[入门指导](https://developer.chrome.com/extensions)
[api传送门](https://developer.chrome.com/extensions/api_index)

* 浏览器icon不支持svg
* browser_action、page_action不能共存
* 通过js来调用的时候，不填可选参数的时候，也需要传空对象
* default_popup 存在的时候，chrome.browserAction.onClicked 无效
