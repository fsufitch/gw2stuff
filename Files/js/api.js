function renderKeyList() {
    var keys = window.localStorage.getItem("API_KEYS") || "{}";
    keys = JSON.parse(keys);

    $("#keys").empty();
    if (Object.keys(keys).length == 0) {
	$("#nokeys-message").show();
    } else {
	$("#nokeys-message").hide();
    }

    for (var keyId in keys) {
	var newElement = $("#key-row-template").clone();
	newElement.css("display", "flex");
	newElement.attr("id", "key-row-" + keyId);
	
	newElement.find(".fullkey").text(keys[keyId]["key"]);
	newElement.find(".acctname").text(keys[keyId]["name"]);

	$("#keys").append(newElement);
    }
}

function addKey() {
    var newKey = $("#newkey").val().trim();
    if (newKey.length != 72) {
	alert("Key is not the correct length of 72 characters!");
	return;
    }

    gwGetAccountInfo(newKey, function(data) {
	console.log("acc info");
	console.log(data);
	$("#newkey").val("");
	var keys = window.localStorage.getItem("API_KEYS") || "{}";
	keys = JSON.parse(keys);

	keys[data["id"]] = data;
	keys[data["id"]]["key"] = newKey;

	console.log("SETTING");
	console.log(keys);
	console.log(JSON.stringify(keys));
	window.localStorage.setItem("API_KEYS", JSON.stringify(keys));
	renderKeyList();
    }, function(errdata){
	alert("Could not add key! Try again later. " + errdata);
    });
}

$(document).ready(function() {
    renderKeyList();
    $("#addkey").click(addKey);
});
