// var contexts = ["page","selection","link","editable","image","video",
//                 "audio"];
// chrome.contextMenus.create({
//   "title": 发起自动扫码,
//   "contexts": [contexts],
//   "onclick": scan
// });
// function scan(info,tab){
//   console.log(info);
//   console.log(tab);
// }
// function genericOnClick(info, tab) {
//   console.log("item " + info.menuItemId + " was clicked");
//   console.log("info: " + JSON.stringify(info));
//   console.log("tab: " + JSON.stringify(tab));
// }

// Create one test item for each context type.
var contexts = ["page", "selection", "link", "editable", "image", "video",
  "audio"
];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick": genericOnClick
  });
  console.log("'" + context + "' item:" + id);
}
