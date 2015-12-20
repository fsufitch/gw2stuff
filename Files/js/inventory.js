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

function makeItemComponent(itemId, count) {
    var itemDiv = $("<div />", {
	"class": "item",
    });
    var countLabel = $("<span />", {
	"text": count,
	"class": "count",
    });

    if (!itemId) {
	itemDiv.addClass("empty");
    } else {
	if (count > 1) {
	    itemDiv.append(countLabel);
	}

	itemDiv.addClass("loading");
	gwGetItem(itemId, function(item) {
	    itemDiv.removeClass("loading");
	    itemDiv.css("background-image", "url(" + item.icon + ")");
	});
    

	itemDiv.mousemove(moveItemDisplayToCursor)
	    .mouseenter(function(e) {
		// appear on entering
		console.log("enter " + e);
		console.log("setting " + itemId)
		moveItemDisplayToCursor(e);
		window.localStorage.setItem("item_id", itemId);
		overwolf.windows.restore("ItemInfoWindow");
	    }).mouseleave(function(e) {
		// minimize on leaving
		console.log("leave " + e);
		console.log("unsetting " + itemId)
		overwolf.windows.minimize("ItemInfoWindow");
		window.localStorage.removeItem("item_id");
	    });
    }
    return itemDiv;
}

function invBank() {
    $("#items_container").empty();

    var keys = window.localStorage.getItem("API_KEYS") || "{}";
    keys = JSON.parse(keys);

    var keyId = window.localStorage.getItem("CURRENT_KEY_ID");
    var apiKey = keys[keyId].key;

    gwGetBank(apiKey, function(items) {
	var tabCounter = 0;
	var itemPanel = $("<div />", {
	    "class": "items",
	});
	for (var i=0; i<items.length; i++) {
	    if (tabCounter >= 30) {
		$("#items_container").append(itemPanel);
		$("#items_container").append($("<hr />"));
		tabCounter = 0;
		var itemPanel = $("<div />", {
		    "class": "items",
		});
	    }

	    var itemDiv;
	    if (items[i]) {
		itemDiv = makeItemComponent(items[i].id, items[i].count);
	    } else {
		itemDiv = makeItemComponent(null);
	    }
	    itemPanel.append(itemDiv);
	    
	    tabCounter += 1;
	}
	$("#items_container").append(itemPanel);
    });
}

function invSampleBank() {
    $("#items_container").empty();
    var itemPanel = $("<div />", {
	"class": "items",
    });
    var itemIds = [30131, 11168, null, 25475, 35474, 67105, 62209, 77407, 1010, 2, null, 666, 30698, 19553, null];
    for (var i=0; i<itemIds.length; i++) {
	var itemId = itemIds[i];
	var itemDiv = makeItemComponent(itemIds[i], 42);
	itemPanel.append(itemDiv);
    }
    $("#items_container").append(itemPanel);
}
