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
	var transparent = (count == 0);
	if (count > 1) {
	    itemDiv.append(countLabel);
	}

	itemDiv.addClass("loading");
	gwGetItem(itemId, function(item) {
	    itemDiv.removeClass("loading");
	    if (!transparent) {
		itemDiv.css("background-image", "url(" + item.icon + ")");
	    } else {
		// super hax
		itemDiv.addClass("empty");
		var transparentDiv = $("<div />")
		    .css("background-image", "url(" + item.icon + ")")
		    .addClass("zeroCount");
		itemDiv.append(transparentDiv);
	    }
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


function _invDisplayMaterials(categories, itemCounts) {
    $("#items_container").empty();

    console.log(categories);
    console.log(itemCounts);
    for (var catId in categories) {
	var category = categories[catId];
	$("#items_container").append($("<div />", {
	    'text': category.name,
	    'class': 'text_divider',
	}));
	var itemPanel = $("<div />", {"class": "items"});
	for (var i=0; i<category.items.length; i++) {
	    var itemId = category.items[i];
	    var count = itemCounts[itemId] || 0;
	    var itemDiv = makeItemComponent(itemId, count);
	    itemPanel.append(itemDiv);
	}
	$("#items_container").append(itemPanel);
    }
}

function invMaterials() {
    var keys = window.localStorage.getItem("API_KEYS") || "{}";
    keys = JSON.parse(keys);

    var keyId = window.localStorage.getItem("CURRENT_KEY_ID");
    var apiKey = keys[keyId].key;

    function cb_err(status, text, data, event) {
	console.log([status, text, data, event]);
    }
    gwGetMaterialCategories(function(categories) {
	gwGetMaterials(apiKey, function(items) {
	    var itemCounts = {};
	    for (var i=0; i<items.length; i++) {
		var item = items[i];
		itemCounts[item.id] = item.count;
	    }
	    _invDisplayMaterials(categories, itemCounts);
	}, cb_err);
    }, cb_err);
    
}

function invSampleMaterials() {
    gwGetMaterialCategories(function(categories) {
	var itemCounts = {};
	for (var catId in categories) {
	    for (var i=0; i<categories[catId].items.length; i++) {
		var itemId = categories[catId].items[i];
		itemCounts[itemId] = Math.floor(Math.random() * 251);
	    }
	}
	_invDisplayMaterials(categories, itemCounts);
    }, function(a, b, c, d) {console.log([a,b,c,d]);});
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
