function _apiSetCache(prefix, id, value, timeout) {
    if (timeout === undefined || timeout === null) {
	timeout = 60 * 60 * 24;
    }
    var key = "++Cache++" + prefix + "++" + id;
    if (value == null) {
	window.localStorage.removeItem(key);
    } else {
	var cacheEntry = {
	    'value': value,
	    'timestamp': parseInt(Date.now()/1000),
	    'timeout': timeout,
	};
	window.localStorage.setItem(key, JSON.stringify(cacheEntry));
    }
}

function _apiGetCache(prefix, id) {
    var key = "++Cache++" + prefix + "++" + id;
    var value = window.localStorage.getItem(key);
    if (value != null) {
	var cacheEntry = JSON.parse(value);
	var hardClearTime = parseInt(window.localStorage.getItem("++Cache++HardClear")) || 0;
	if (hardClearTime > 0 && cacheEntry.timestamp > hardClearTime) {
	    _apiSetCache(prefix, id, null); // forced expire
	    return null;
	}
	var now = parseInt(Date.now()/1000);
	if ((cacheEntry.timestamp + cacheEntry.timeout) > now) {
	    _apiSetCache(prefix, id, null); // timeout expire
	    return null;
	}
	return cacheEntry.value;
    } else {
	return null;
    }
}

function gwClearCache() {
    var now = parseInt(Date.now()/1000);
    window.localStorage.setItem("++Cache++HardClear", now);
}


/////////

var _GW2 = FW_GW2();
var api_settings = {
  "language": "en"
};

function gwGetItem(id, cb, cb_err) {
  if (typeof DB_ItemTypes !== "undefined") {
    var results = DB_ItemTypes({"id": id}).get();
    if (results.length > 0) {
      // TODO: enable item cache clearing
      cb(results[0]);
      return;
    }
  }

  _GW2.getItem(id, api_settings.language,
    function(data) {
      DB_ItemTypes.insert(data);
      cb(data);
    },
    function(status, text, data) {
      DB_ItemTypes({"id": id}).remove();
      cb_err([status, text, data]);
    },
    2
  );

}

function gwGetAccountInfo(key, cb, cb_err) {
    cb_err = cb_err || function(e){console.log(e)};
    if (_apiGetCache('account', key) != null) {
	cb(_apiGetCache('account', key));
	return;
    }
    _GW2.getAccount(key, function(data) { // cb
	_apiSetCache('account', key, data);
	cb(data);
    }, function(status, text, data) { // cb_err
	_apiSetCache('account', key, null);
	cb_err([status, text, data]);
    });

}

function gwGetCharacterNames(key, cb, cb_err) {
    cb_err = cb_err || function(e){console.log(e)};

    _GW2.getCharacters(key, cb, function(status, text, data) { // cb_err
	cb_err([status, text, data]);
    });
}

function gwGetBank(key, cb, cb_err) {
    cb_err = cb_err || function(e){console.log(e)};

    _GW2.getAccountBank(key, cb, function(status, text, data) { // cb_err
	cb_err([status, text, data]);
    });
}

function gwGetMaterialCategories(cb, cb_err) {
    if (_apiGetCache("static", "materials") != null) {
	cb(_apiGetCache("static", "materials"));
    }
    _GW2.getMaterials(function(matIds) {
	_GW2.getMaterialsByID(matIds, api_settings.language, function(catArray) {
	    var matMap = {};
	    for (var i=0; i<catArray.length; i++) {
		var cat = catArray[i];
		matMap[cat.id] = cat;
	    }
	    _apiSetCache("static", "materials", matMap);
	    cb(matMap);
	}, cb_err);
    }, cb_err);
}

function gwGetMaterials(key, cb, cb_err) {
    cb_err = cb_err || function(e){console.log(e)};

    _GW2.getAccountMaterials(key, cb, function(status, text, data) { // cb_err
	cb_err([status, text, data]);
    });
}

function gwGetCharacter(key, charName, cb, cb_err) {
    cb_err = cb_err || function(e){console.log(e)};

    _GW2.getCharacter(key, charName, cb, function(status, text, data) { // cb_err
	cb_err([status, text, data]);
    });
}
