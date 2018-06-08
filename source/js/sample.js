var raw_id = '';
var msg = {
  "title": "",
  "message": ""
};

function scan(info, tab) {
  console.log(tab.id);
  qrcode.callback = function(data) {
    if (data.indexOf("mp.weixin.qq.com") !== -1) {
      const params = new URLSearchParams();
      params.append('raw_id', raw_id);
      params.append('url', data);
      axios.post('http://www.xxxx.test/api/autoscan', params)
        .then(function(response) {
          if (response.data.status) {
            msg.title = "扫码发送成功";
          } else {
            msg.title = "扫码发生错误";
          }
          msg.message = response.data.message;
          notice(msg)
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      msg.title = "扫码发生错误";
      msg.message = "二维码不属于微信或解析出错，请刷新重试！";
      notice(msg)
    }
  };
  qrcode.decode(info.srcUrl);
}
chrome.cookies.get({
  "url": "https://mp.weixin.qq.com",
  "name": "ticket_id"
}, function(data) {
  if (data) {
    raw_id = data.value
  }
})

chrome.contextMenus.create({
  "title": "发起自动扫码",
  "contexts": ["image"],
  "onclick": scan
});
chrome.runtime.onInstalled.addListener(function() {

});

function notice(data) {
  chrome.notifications.create('scanNotice', {
    "type": "basic",
    "iconUrl": "/source/images/icons/96.png",
    "title": data.title,
    "message": data.message
  }, function(res) {
    console.log(res)
  })
}
