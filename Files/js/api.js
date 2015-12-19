function renderKeyList() {
    var keys = window.localStorage.getItem("API_KEYS") || "{}";
    keys = JSON.parse(keys);

    $("#keys").empty();
    if (Object.keys(keys).length == 0) {
	$("#nokeys-message").show();
    } else {
	$("#nokeys-message").hide();
    }

    var currentKey = window.localStorage.getItem("CURRENT_KEY_ID") || null;

    for (var keyId in keys) {
	var newElement = $("#key-row-template").clone();
	newElement.css("display", "flex");
	newElement.attr("id", "key-row-" + keyId);
	
	newElement.find(".fullkey").text(keys[keyId]["key"]);
	newElement.find(".acctname").text(keys[keyId]["name"]);

	if (keyId == currentKey) {
	    newElement.find(".current_check img").css("visibility", "visible");
	} else {
	    newElement.find(".current_check img").css("visibility", "hidden");
	}
	
	$("#keys").append(newElement);

	newElement.find(".use-button")
	    .attr("data-keyid", keyId)
	    .click(function() {
		var keyId = $(this).attr("data-keyid");
		window.localStorage.setItem("CURRENT_KEY_ID", keyId);
		renderKeyList();
	});

	newElement.find(".delete-button")
	    .attr("data-keyid", keyId)
	    .click(function() {
		var keyId = $(this).attr("data-keyid");
		if (window.localStorage.getItem("CURRENT_KEY_ID") == keyId) {
		    window.localStorage.removeItem("CURRENT_KEY_ID");
		}
		var keys = window.localStorage.getItem("API_KEYS") || "{}";
		keys = JSON.parse(keys);
		delete keys[keyId];
		window.localStorage.setItem("API_KEYS", JSON.stringify(keys));
		renderKeyList();
	});
    }
}

function addKey() {
    var newKey = $("#newkey").val().trim();
    if (newKey.length != 72) {
	alert("Key is not the correct length of 72 characters!");
	return;
    }

    gwGetAccountInfo(newKey, function(data) {
	$("#newkey").val("");
	var keys = window.localStorage.getItem("API_KEYS") || "{}";
	keys = JSON.parse(keys);

	keys[data["id"]] = data;
	keys[data["id"]]["key"] = newKey;

	window.localStorage.setItem("API_KEYS", JSON.stringify(keys));
	if (Object.keys(keys).length == 1) {
	    // Single key, auto-select it
	    window.localStorage.setItem("CURRENT_KEY_ID", data["id"]);
	}
	
	renderKeyList();
    }, function(errdata){
	alert("Could not add key! Try again later. " + errdata);
    });
}


$(document).ready(function() {
    renderKeyList();
    $("#addkey").click(addKey);
});
