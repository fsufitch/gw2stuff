var currentItemId = null;

function windowResize() {
   var contentWidth = $("#content-wrap").width();
   var contentHeight = $("#content-wrap").height();
   console.log("Resize "+ contentWidth + " "+ contentHeight);
   overwolf.windows.getCurrentWindow(function(r) {
     console.log(r);
     overwolf.windows.changeSize(r.window.id, contentWidth+20, contentHeight+20);
   });
}

function showItem(item) {
  currentItemId = item.id;
  $("#item-icon").attr("src", item.icon);
  $("#item-name").text(item.name)
    .removeClass().addClass(item.rarity.toLowerCase());
  windowResize();
}

function storageChanged(e) {
    var item_id = localStorage.getItem('item_id');
    item_id = parseInt(item_id);
    if (item_id == currentItemId) {
      return;
    }
    if (item_id != null && item_id != NaN) {
      gwGetItem(item_id, showItem);
    }
}

$(window).bind('storage', storageChanged);

$(document).ready(function() {
  storageChanged();
})
