
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

function updateApiKey() {
    var keys = window.localStorage.getItem("API_KEYS") || "{}";
    keys = JSON.parse(keys);

    var newKeyId = window.localStorage.getItem("CURRENT_KEY_ID");

    console.log("New key: " + newKeyId);
    if (keys[newKeyId] == null) { // something invalid
	console.log("invalid");
	$("#curr-key-name").text("<no key>");
	return
    }
    console.log(keys[newKeyId]);
    
    $("#curr-key-name").text(keys[newKeyId].name);
}

function storageChanged(ev) {
    console.log(ev);
    if (ev.key == "CURRENT_KEY_ID") { // key changed, everything changes!
	updateApiKey();
    }
}

function bindInfoHover() {
    overwolf.windows.obtainDeclaredWindow("ItemInfoWindow", function(r) {
	console.log(r);
    });
    $('[data-gw2item]')
	.unbind('mousemove').unbind('mouseenter')
	.mousemove(moveItemDisplayToCursor)
	.mouseenter(function(e) {
	    // appear on entering
	    moveItemDisplayToCursor(e);
	    localStorage.setItem("item_id", $(this).attr("data-gw2item"));
	    overwolf.windows.restore("ItemInfoWindow");
	}).mouseleave(function() {
	    // minimize on leaving
	    overwolf.windows.minimize("ItemInfoWindow");
	    localStorage.removeItem("item_id");
	});
}

$(document).ready( function() {

    console.log("making");
    var itemIds = [30131, 11168, 25475, 35474, 67105, 62209, 77407, 1010, 2, 666, 30698, 19553];
    for (var i=0; i<itemIds.length; i++) {
	var itemId = itemIds[i];
	$("<img />", {
	    "data-gw2item": itemId,
	    "style": "margin: 5px",
	}).appendTo("#demo-items");

	gwGetItem(itemId, function(item) {
	    $("[data-gw2item="+item.id+"]").attr("src", item.icon);
	});
    }

    $("#managekeys").click(function() {
	overwolf.windows.obtainDeclaredWindow("ApiManagementWindow", function(r) {
	    overwolf.windows.restore("ApiManagementWindow");
	});
    });

    window.addEventListener('storage', storageChanged);
    updateApiKey();
    
    bindInfoHover();
});
