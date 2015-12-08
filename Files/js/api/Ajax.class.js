/**
 * Ajax class
 **/
var FW_Ajax$Events = ['onabort','onerror','onload','onloadend','onloadstart','onprogress','onreadystatechange','ontimeout'];
var FW_Ajax = function(debug) {
	
	// Auto instantiate
	if (this.__proto__.constructor !== FW_Ajax) return new FW_Ajax(debug);
	
	// Set debug
	this.debug = typeof debug != 'boolean' ? false : debug;
	//this.debug = true;
	
	/**
	 * Get handler
	 */
	var getHandler = function() {
		if (typeof XMLHttpRequest !== 'undefined') return new XMLHttpRequest();
		var versions = [
			'MSXML2.XMLHTTP.5.0',
			'MSXML2.XMLHTTP.4.0',
			'MSXML2.XMLHTTP.3.0',
			'MSXML2.XMLHTTP.2.0',
			'Microsoft.XMLHTTP'
		];
		var xhr;
		for(var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {}
		}
		return xhr;
	};
	
	// Handler
	var handler = getHandler();
	
	// Inner this
	var that = this;
	
	this.byte2human = function(size,reverse,fake) {
		if (typeof size == 'string') mixed = parseInt(mixed);
		else if (typeof size == 'number') size = size;
		else return size;
		if (typeof reverse != 'boolean') reverse = false;
		if (typeof fake != 'boolean') fake = false;
		var factor = 1024;
		var i = 0;
		var units = ['Byte','KByte','MByte','GByte','TByte','PByte','EByte','ZByte','YByte'];
		var unitsCount = units.length;
		if (fake) factor = 1000;
		while (size >= factor && i < unitsCount) {
			if (reverse) size *= factor;
			else size /= factor;
			i++;
		}
		return size.toFixed(2)+' '+units[i];
	}
	
	/**
	 * Assign event
	 */
	this.event = function(eventName,doEvent) {
		var events = FW_Ajax$Events;
		var found = false;
		for (var i = 0; i < events.length; i++) {
			if (events[i] == eventName) {
				found = true;
				break;
			}
		}
		if (!found) return this;
		handler[eventName] = function(event) {
			that.onEvent(doEvent)(event);
		};
		return this;
	};
	
	/**
	 * Assign upload event
	 */
	this.eventUpload = function(eventName,doEvent) {
		var events = FW_Ajax$Events;
		var found = false;
		for (var i = 0; i < events.length; i++) {
			if (events[i] == eventName) {
				found = true;
				break;
			}
		}
		if (!found) return this;
		handler.upload[eventName] = function(event) {
			that.onEvent(doEvent)(event);
		};
		return this;
	};
	
	/**
	 * GET Request
	 */
	this.get = function(url,doSuccess,doError,async,headers) {
		return this.run(null,doSuccess,doError,async,'GET',url,null,headers);
	};
	
	/**
	 * GET JSON Request
	 */
	this.getJSON = function(url,doSuccess,doError,async,headers) {
		return this.run(function(event) {
			return JSON.parse(event.target.responseText);
		},doSuccess,doError,async,'GET',url,null,headers);
	};
	
	/**
	 * GET XML Request
	 */
	this.getXML = function(url,doSuccess,doError,async,headers) {
		return this.run(function(event) {
			return event.target.responseXML;
		},doSuccess,doError,async,'GET',url,null,headers);
	};
	
	/**
	 * XML HTTP Handler
	 */
	this.handler = function(newHandler) {
		if (typeof newHandler != 'boolean') newHandler = false;
		if (newHandler) return getHandler();
		else return handler;
	};
	
	/**
	 * On error
	 */
	this.onError = function(doError) {
		if (typeof doError != 'function') doError = function(status,text,data,event) {
			if (that.debug) console.log('FW_Ajax','onError',status,text,data,event);
		};
		return doError;
	};
	
	/**
	 * On event
	 */
	this.onEvent = function(doEvent) {
		if (typeof doEvent != 'function') doEvent = function(event) {
			if (that.debug) console.log('FW_Ajax','onEvent',event.type,event);
		};
		return doEvent;
	};
	
	/**
	 * On process
	 */
	this.onProcess = function(doProcess) {
		if (typeof doProcess != 'function') doProcess = function(event) {
			if (that.debug) console.log('FW_Ajax','onProcess',event);
			return event.target.responseText;
		};
		return doProcess;
	};
	
	/**
	 * On success
	 */
	this.onSuccess = function(doSuccess) {
		if (typeof doSuccess != 'function') doSuccess = function(data,event) {
			if (that.debug) console.log('FW_Ajax','onSuccess',data,event);
		};
		return doSuccess;
	};
	
	/**
	 * POST Request
	 */
	this.post = function(url,data,doSuccess,doError,async) {
		if (typeof data == 'undefined') data = '';
		return this.run(null,doSuccess,doError,async,'POST',url,data,{
			'Content-Type':'application/x-www-form-urlencoded'
		});
	};
	
	/**
	 * POST Multipart Request
	 */
	this.postMultipart = function(url,data,doSuccess,doError,async) {
		if (typeof data == 'undefined') data = '';
		return this.run(null,doSuccess,doError,async,'POST',url,data,{
			'Content-Type':'multipart/form-data'
		});
	};
	
	/**
	 * Run
	 */
	this.run = function(doProcess,doSuccess,doError,async,method,url,data,headers) {
		if (typeof async == 'undefined') async = true;
		if (typeof method == 'undefined') method = 'GET';
		if (typeof url != 'string') return false;
		if (typeof data == 'undefined') data = null;
		if (typeof headers == 'undefined') headers = {};
		if (this.debug) console.log('FW_Ajax','run',[method,url,async,headers,data,that.onProcess(doProcess),that.onSuccess(doSuccess),that.onError(doError)]);
		if (typeof handler.onreadystatechange != 'function') {
			handler.onreadystatechange = function(event) {
				if (handler.status > 0 && handler.status >= 400) {
					that.onError(doError)(handler.status,handler.statusText,data,event);
					return;
				} else if (handler.readyState == 4) {
					var data = that.onProcess(doProcess)(event);
					if (handler.status == 200 || handler.status == 206) that.onSuccess(doSuccess)(data,event);
					else that.onError(doError)(handler.status,handler.statusText,data,event);
					return;
				}
				//if (handler.status > 0) console.log('>>>',handler.status);
			};
		}
		handler.open(method,url,async);
		for (var key in headers) handler.setRequestHeader(key,headers[key]);
		handler.send(data);
		return this;
	};
};