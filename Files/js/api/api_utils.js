function _apiSetCache(prefix, id, value) {
  var key = "++Cache++" + prefix + "++" + id;
  if (value == null) {
    localStorage.clear(id, JSON.stringify(value));
  } else {
    localStorage.setItem(id, JSON.stringify(value));
  }
}

function _apiGetCache(prefix, id) {
  var key = "++Cache++" + prefix + "++" + id;
  var value = localStorage.getItem(key);
  if (value != null) {
    value = JSON.parse(value);
  }
  return value;
}

/////////

var _GW2 = FW_GW2();
var api_settings = {
  "language": "en"
};

function gwGetItem(item_id, cb, cb_err) {
  var item_id = parseInt(item_id);
  if (item_id == null || item_id == NaN) return {'error': 'not a number id'};
  cb_err = cb_err || function(e){console.log(e)};
  if (_apiGetCache('item', item_id) != null) {
    cb(_apiGetCache('item', item_id));
  }
  _GW2.getItem(item_id, api_settings.language,
    function(data) {
      _apiSetCache('item', item_id, data);
      cb(data);
    },
    function(status, text, data) {
      _apiSetCache('item', item_id, null);
      cb_err([status, text, data]);
    },
    2
  );
}
