
function viewSelected(ev) {
  if (!$(this).is(":checked")) return;

  var viewId = $(this).val();
  var parts = viewId.split(":");
  console.log(parts);
  if (parts[0] == "bank" && parts[1] == "real") {
    console.log("bank!")
    invBank();
  }
  else if (parts[0] == "bank" && parts[1] == "sample") {
    console.log("sample bank!")
    invSampleBank();
  }
  else if (parts[0] == "materials" && parts[1] == "real") {
    console.log("real mats!")
    invMaterials();
  }
  else if (parts[0] == "materials" && parts[1] == "sample") {
    console.log("sample mats!")
    invSampleMaterials();
  } else if (parts[0] == "char") {
    invCharacter(parts[1]);
  }
}

function updateCharacters() {
  var keyId = window.localStorage.getItem("CURRENT_KEY_ID");
  var keys = window.localStorage.getItem("API_KEYS") || "{}";
  keys = JSON.parse(keys);
  var apiKey = ((keys && keys[keyId]) ? keys[keyId].key : null);

  function updateViews(nameList) {
    var views = [];
    if (nameList.length == 0) {
      views.push({value:"bank:sample", text:"Bank (sample)"});
      views.push({value:"materials:sample", text:"Materials (sample)"});
    } else {
      views.push({value:"bank:sample", text:"Bank (sample)"});
      views.push({value:"materials:sample", text:"Materials (sample)"});
      views.push({value:"bank:real", text:"Bank"});
      views.push({value:"materials:real", text:"Materials"});
    }
    for (var i=0; i<nameList.length; i++) {
      views.push({
        value: "char:" + nameList[i],
        text: nameList[i],
      });
    }

    $("#viewselect").empty();

    for (var i=0; i<views.length; i++) {
      $("<label />")
      .append( $("<input />", {
        "type": "radio",
        "name": "selected_view",
        "value": views[i].value,
        "id": "radio" + i,
      }).change(viewSelected) )
      .append( $("<div />", {
        "text": views[i].text,
      }) )
      .appendTo($("#viewselect"));
    }
    $("#viewselect input[value^=bank]").prop("checked", true).trigger("change");
  }

  if (apiKey != null) {
    gwGetCharacterNames(apiKey, updateViews, function(err) { // cb_err
      alert(err);
      updateViews([]);
    });
  } else {
    updateViews([]);
  }
}

function updateApiKey() {
  var keys = window.localStorage.getItem("API_KEYS") || "{}";
  keys = JSON.parse(keys);

  var newKeyId = window.localStorage.getItem("CURRENT_KEY_ID");

  if (keys[newKeyId] == null) { // something invalid
    console.log("invalid");
    $("#curr-key-name").text("<no key>");
  } else {
    $("#curr-key-name").text(keys[newKeyId].name);
  }
  updateCharacters();
}

function storageChanged(ev) {
  console.log(ev);
  if (ev.key == "CURRENT_KEY_ID") { // key changed, everything changes!
    updateApiKey();
  }
}

$(document).ready( function() {
  overwolf.windows.obtainDeclaredWindow("ItemInfoWindow", function(r) {
    console.log(r);
  });

  console.log("making");

  $("#managekeys").click(function() {
    overwolf.windows.obtainDeclaredWindow("ApiManagementWindow", function(r) {
      overwolf.windows.restore("ApiManagementWindow");
    });
  });

  window.addEventListener('storage', storageChanged);
  updateApiKey();

  invSampleBank();
});
