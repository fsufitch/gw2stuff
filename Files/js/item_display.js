var currentItemId = null;

function windowResize() {
   var contentWidth = $("#content-wrap").width();
   var contentHeight = $("#content-wrap").height();
   overwolf.windows.getCurrentWindow(function(r) {
     console.log(r);
       overwolf.windows.changeSize(r.window.id, 300, contentHeight+10);
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
    console.log(e);
    if (e != null && e.key != 'item_id') return;
    var item_id = localStorage.getItem('item_id');
    item_id = parseInt(item_id);
    if (item_id == currentItemId || item_id == NaN) {
      return;
    }
    if (item_id != null && !!item_id /*wtf, NaN*/) {
      gwGetItem(item_id, showItem);
    }
}


$(document).ready(function() {
    window.addEventListener('storage', storageChanged);
    storageChanged();
})
