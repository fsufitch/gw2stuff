function moveItemDisplayToCursor(e) {
  // move window with the mouse
  overwolf.windows.getCurrentWindow(function(r) {
    var currentWindow = r.window;
    overwolf.windows.obtainDeclaredWindow("ItemInfoWindow", function(r) {
      if (!r.window.isVisible) return;
      var x = currentWindow.left + e.clientX ;
      var y = currentWindow.top + e.clientY + 20;
      overwolf.windows.changePosition(r.window.id, x, y);
    });
  });
}

$(document).ready( function() {
  overwolf.windows.obtainDeclaredWindow("ItemInfoWindow", function(r) {
    console.log(r);
  });

  $('[data-gw2item]')
  .mousemove(moveItemDisplayToCursor)
  .mouseenter(function(e) {
    // appear on entering
    moveItemDisplayToCursor(e);
    console.log('enter');
    localStorage.setItem("item_id", $(this).attr("data-gw2item"));
    overwolf.windows.restore("ItemInfoWindow");
  }).mouseleave(function() {
    // minimize on leaving
    console.log('leave');
    overwolf.windows.minimize("ItemInfoWindow");
    localStorage.clear("item_id");
  });
});
