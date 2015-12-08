/**
 * GW2 class
 * Last change: 2015-11-29
 * Requires: FW_Ajax
 * Disabled by ArenaNet:
 * - https://wiki.guildwars2.com/wiki/API:1/events (No longer in use)
 * - https://wiki.guildwars2.com/wiki/API:2/floors (Merged into v2/continents)
 * Multiple API versions:
 * - getBuild
 * - getColors
 * - getContinents
 * - getFiles
 * - getItem
 * - getMap
 * - getMaps
 * - getRecipe
 * - getSkin
 * - getSkins
 **/
var FW_GW2$ImageData = { // Just some default icons
	'gem':   'data:image/png;base64,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',
	'gold':  'data:image/png;base64,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',
	'silver':'data:image/png;base64,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',
	'copper':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAshJREFUeNqM00toHHUAgPFvnptsurtJmt0Y2QabRom2EGxFQ20hB5Wixb0UEUWKAU0LnryUXj0UTwrqQagHEVEQxZMevRQNbSgivmJA8ihpNjOzu7Pznv88/p5EFAW/++/4KVJK/q3LF5Zbv/7y86pp6E8gy2aJstdojH/2xY2N60F/nyiKUP6Jz52cHc9E/HFzaurpBx+YU+qjBmqZ4TgOW3e62H7qPLJ0duHqm+/1/oaffezoFV2R1zqdjtq+p0kZ9Ui9HnHgg/AZDl1ubtxlp59ZRZbcq/8Jz5868v5Us7m68vIKY1pGv99j1/IIBkMi38W2LUQasHikRlG4rVBvf64CdJbmrkwenly9fOkSdaPAclxEKlCzlCQMKYucimngR4KDIOfYTA23bz+jrnTOHJNZeu3ii8+jJQN279ylUkY0TIkpM8hTiiQj9UOyIGTHiZB5Si6EoXd3f79+bvm0OqGnWHaAWSToiiQYeCSBi4hjLMsmDDx0TaXdmkCIIYZpFjplfvr43AzCszFFRC4SnP0e3tCj3/Oxuj0GfoCUJdPtNtOVlB+tlNZMe103zZFK3Uiw9rbJkphDIxWMIiEPh8gspWooiEoFrTqGmifY/YQtRzBbV19T8zyTntujVtUY0xJqRk7dkBhkjJoqQggUo4Ku5NS0lC235L77F268+8nXt9UoFXvf3PqNLImpTx4mExm208OPBYNYADA7UTJZlWz2chK9sZVE4ZNpkqDPP7R4Ye2n299qeaydOjqO5Xh0bZ9MwkTDREqdHTfHDkv0emvNPdg7++FXawWA0t3e4PVXX3hpf3vzo/nWKNOHdCqaii8KhknJwTDFz7Vo4cTDV5+7+Mo7URhx4uSjjFbHUHY3f2D91k0+ePuNOU3Vv4xDb56yGMmlElSr1c2F44ufnnnq/FtLjy/z/fp3aKr2F/6vq/5PfwwA/h5+2dZ8WWoAAAAASUVORK5CYII=',
};
var FW_GW2 = function() {
	
	// Auto instantiate
	if (this.__proto__.constructor !== FW_GW2) return new FW_GW2();
	
	// Inner this
	var that = this;
	
	/**
	 * GET JSON Request that supports Authorization bearer
	 */
	var _getJSON = function(url,doSuccess,doError) {
		FW_Ajax().getJSON(url,doSuccess,doError,true);
	};
	
	/**
	 * Error event
	 */
	var _onError = function(doError,code,text,obj) {
		FW_Ajax().onError(doError)(code,text,obj);
	};
	
	/**
	 * Success event
	 */
	var _onSuccess = function(doSuccess,obj) {
		FW_Ajax().onSuccess(doSuccess)(obj);
	};
	
	/**
	 * @description Calculate the percentual score for one server color
	 * @param {number} red - Red color count
	 * @param {number} green - Green color count
	 * @param {number} blue - Blue color count
	 * @param {number} value - Value to calculate percentage
	 * @returns {number} Percentage of value
	 */
	this.calcScorePercentage = function(red,green,blue,value) {
		if (typeof red != 'number') return 0;
		if (typeof green != 'number') return 0;
		if (typeof blue != 'number') return 0;
		if (typeof value != 'number') return 0;
		var total = red + green + blue;
		if (value < 1 || total < 1) return 0;
		var result = (100 * value) / total;
		return Math.round(result * 10) / 10;
	};
	
	/**
	 * @description Get account object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccount = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get account achievements object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/achievements}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountAchievements = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/achievements?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get bank map from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/bank}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountBank = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/bank?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get dyes from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/dyes}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountDyes = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/dyes?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get materials map from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/materials}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountMaterials = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/materials?access_token='+apiKey,doSuccess,doError);
		return this;
	};

	/**
	 * @description Get account minis object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/minis}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountMinis = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/minis?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	/**
	 * @description Get skins from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/skins}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountSkins = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/skins?access_token='+apiKey,doSuccess,doError);
		return this;
	};

	/**
	 * @description Get wallet from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/wallet}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountWallet = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/wallet?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get achievement by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {number} id - Achievement ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievement = function(id,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/achievements/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all achievement ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievements = function(lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/achievements?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of achievement objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {object|string} ids - List of achievement ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAchievementsByID = function(ids,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/achievements?ids='+this.stringifyArray(ids)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get all worlds as map (Combination of getWorlds and getWorldsByID)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAllWorlds = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		this.getWorlds(function(data) {
			var worlds = data;
			that.getWorldsByID(worlds,lang,doSuccess,doError);
		},doError);
		return this;
	}
	
	/**
	 * @description Get game build ID number
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/build}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/build}
	 * @see {@link http://jsfiddle.net/cisco211/dhfa57pj}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getBuild = function(doSuccess,doError,version) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/build.json',function(data) {
					_onSuccess(doSuccess,data['build_id']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/build',function(data) {
					_onSuccess(doSuccess,data['id']);
				},doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get character object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {string} character - Character name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacter = function(apiKey,character,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/characters/'+encodeURI(character)+'?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of character names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharacters = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/characters?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get character object(s) from names(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {object|string} characters - Character name(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharactersByName = function(apiKey,characters,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/characters?ids='+this.stringifyArray(characters)+'&access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get characters by page
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/characters}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {number} page - Page number
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCharactersByPage = function(apiKey,page,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/characters?page='+page+'&access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get color object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @param {number} id - Color ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColor = function(id,lang,doSuccess,doError) {
		if (typeof id != 'number') id = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/colors/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of color ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/colors}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColors = function(lang,doSuccess,doError,version) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/colors.json?lang='+lang,function(data) {
					_onSuccess(doSuccess,data['colors']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/colors',doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get color object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/colors}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/colors}
	 * @param {object|number} colors - Color ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getColorsByID = function(colors,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/colors?ids='+this.stringifyArray(colors)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinent = function(cid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent floor by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentFloor = function(cid,fid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent floor ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentFloors = function(cid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent map by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentMap = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent map ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentMaps = function(cid,fid,rid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent points of interest object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} pid - POI ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentPOI = function(cid,fid,rid,mid,pid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof pid != 'number') pid = 554;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/pois/'+pid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent points of interest ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentPOIs = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/pois?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent region object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentRegion = function(cid,fid,rid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent region ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentRegions = function(cid,fid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get all continents or list of all continent ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/continents}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinents = function(lang,doSuccess,doError,version) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/continents.json?lang='+lang,function(data) {
					_onSuccess(doSuccess,data['continents']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/continents?ids=all&lang='+lang,doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get continent sector object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} sid - Sector ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentSector = function(cid,fid,rid,mid,sid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof sid != 'number') sid = 513;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/sectors/'+sid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent sector ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentSectors = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/sectors?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get continent task object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {number} tid - Task ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentTask = function(cid,fid,rid,mid,tid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof tid != 'number') tid = 1;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/tasks/'+tid+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of continent task ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/continents}
	 * @param {number} cid - Continent ID
	 * @param {number} fid - Floor ID
	 * @param {number} rid - Region ID
	 * @param {number} mid - Map ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getContinentTasks = function(cid,fid,rid,mid,lang,doSuccess,doError) {
		if (typeof cid != 'number') cid = 1;
		if (typeof fid != 'number') fid = 1;
		if (typeof rid != 'number') rid = 1;
		if (typeof mid != 'number') mid = 26;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/continents/'+cid+'/floors/'+fid+'/regions/'+rid+'/maps/'+mid+'/tasks?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of currencies ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrencies = function (lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/currencies?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get currency object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @param {object|string} ids - Array of currency ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrenciesByID = function (ids,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/currencies?ids='+this.stringifyArray(ids)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get currency object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/currencies}
	 * @param {number} id - Currency ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getCurrency = function (id,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/currencies/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get emblem by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {number} id - emblem ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblem = function(what,id,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/emblem/'+what+'?id='+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all emblem ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblems = function(what,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/emblem/'+what,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of emblem objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/achievements}
	 * @param {string} what - What keyword (foregrounds|backgrounds)
	 * @param {object|string} ids - List of emblem ID's
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEmblemsByID = function(what,ids,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/emblem/'+what+'?ids='+this.stringifyArray(ids),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get event object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/event_details}
	 * @param {number} id - Event ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEvent = function(id,lang,doSuccess,doError) {
		if (typeof id != 'string') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/event_details.json?event_id='+id+'&lang='+lang,function(data) {
			_onSuccess(doSuccess,data['events'][id]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get all events as map
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/event_details}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEvents = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/event_details.json?lang='+lang,function(data) {
			_onSuccess(doSuccess,data['events']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get map of event names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/event_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getEventNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/event_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get exchange rate object for gold or gems
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/exchange}
	 * @param {string} what - "What" exchange rate to show? (coins|gems)
	 * @param {number} quantity - The quantity of "what"
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getExchange = function(what,quantity,doSuccess,doError) {
		if (typeof what != 'string') {
			_getJSON('https://api.guildwars2.com/v2/commerce/exchange',doSuccess,doError);
		} else {
			if (typeof quantity != 'number') quantity = 100;
			_getJSON('https://api.guildwars2.com/v2/commerce/exchange/'+what+'?quantity='+quantity,doSuccess,doError);
		}
		return this;
	};
	
	/**
	 * @description Get all files map
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/files}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/files}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFiles = function(doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		var url = 'https://api.guildwars2.com/v1/files.json';
		switch (version) {
			case 2: url = 'https://api.guildwars2.com/v2/files?ids=all'; break;
		}
		_getJSON(url,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get files map from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/files}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/files}
	 * @param {object|string} files - File ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getFilesByID = function(files,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/files?ids='+this.stringifyArray(files),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get guild details object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/guild_details}
	 * @param {string} id - Guild ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildDetailsByID = function(id,doSuccess,doError) {
		if (typeof id != 'string') return this;
		_getJSON('https://api.guildwars2.com/v1/guild_details.json?guild_id='+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get guild details object by name
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/guild_details}
	 * @param {string} name - Guild name (UTF-8)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getGuildDetailsByName = function(name,doSuccess,doError) {
		if (typeof name != 'string') return this;
		_getJSON('https://api.guildwars2.com/v1/guild_details.json?guild_name='+name,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get guild emblem URL
	 * @param {string} name - Guild name (UTF-8)
	 * @returns {string} Guild emblem URL
	 */
	this.getGuildEmblemURL = function(name) {
		if (typeof name != 'string') return '';
		var fname = encodeURI(name.toLowerCase()).replace(/%20/g,'-');
		return 'http://guilds.gw2w2w.com/guilds/'+fname+'/256.svg';
	}
	
	/**
	 * @description Get world match ID from world ID and matches map
	 * @param {number} id - World ID
	 * @param {object} matches - Matches object
	 * @returns {string} Match ID
	 */
	this.getHomeWorldMatchID = function(id,matches) {
		var matchID = false;
		for (var key in matches) {
			if (matches[key]['red_world_id'] == id || matches[key]['green_world_id'] == id || matches[key]['blue_world_id'] == id) {
				matchID = key;
				break;
			}
		}
		return matchID;
	};
	
	/**
	 * @description Get world name from world ID and worlds map
	 * @param {number} id - World ID
	 * @param {object} worlds - Worlds object
	 * @returns {string|boolean} World name or false
	 */
	this.getHomeWorldName = function(id,worlds) {
		if (typeof id == 'undefined') return false;
		if (typeof worlds == 'undefined') return false;
		if (typeof worlds[id]['name'] != 'undefined') return worlds[id]['name'];
		else return false;
	};
	
	/**
	 * @description Get item object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/item_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/items}
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItem = function(id,lang,doSuccess,doError,version) {
		if (typeof id != 'number') return this;
		if (typeof version != 'number') version = 1;
		if (typeof lang != 'string') lang = 'en';
		var url = 'https://api.guildwars2.com/v1/item_details.json?item_id='+id+'&lang='+lang;
		switch (version) {
			case 2: url = 'https://api.guildwars2.com/v2/items/'+id+'?lang='+lang; break;
		}
		_getJSON(url,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all item ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/items}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItems = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/items.json',function(data) {
			_onSuccess(doSuccess,data['items']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get item object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/items}
	 * @param {object|number} items - Item ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getItemsByID = function(items,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/items?ids='+this.stringifyArray(items)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get map object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/maps}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMap = function(id,lang,doSuccess,doError,version) {
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/maps.json?map_id='+id+'&lang='+lang,function(data) {
					_onSuccess(doSuccess,data['maps'][id+'']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/maps/'+id+'?lang='+lang,doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get all maps or list of all map ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/maps}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaps = function(lang,doSuccess,doError,version) {
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/maps.json?lang='+lang,function(data) {
					_onSuccess(doSuccess,data['maps']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/maps',doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get map object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/maps}
	 * @param {object|number} maps - Map ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapsByID = function(maps,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/maps?ids='+this.stringifyArray(maps)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get map floor object by continent ID and floor ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/map_floor}
	 * @param {number} id - Map ID
	 * @param {number} floor - Floor ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapFloor = function(id,floor,lang,doSuccess,doError) {
		if (typeof id != 'number') return this;
		if (typeof floor != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/map_floor.json?continent_id='+id+'&floor='+floor+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get object of all map names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/map_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMapNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/map_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get match object (Directly extracts match object from matches object)
	 * @param {number} id - Match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatch = function(id,doSuccess,doError) {
		if (typeof id != 'string') return this;
		this.getMatches(function(data) {
			if (typeof data[id] == 'undefined') _onError(doError,404,'ID not found!',{'id':'id','data':data});
			else _onSuccess(doSuccess,data[id]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get map of all matches
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/matches}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatches = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/wvw/matches.json',function(data) {
			var optimized = {};
			var matches = data['wvw_matches'];
			for (var i = 0; i < matches.length; i++) optimized[matches[i]['wvw_match_id']] = matches[i];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get match details object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/match_details}
	 * @param {number} id - Match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMatchDetails = function(id,doSuccess,doError) {
		if (typeof id != 'string') return this;
		_getJSON('https://api.guildwars2.com/v1/wvw/match_details.json?match_id='+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get material object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @param {number} id - Material ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterial = function(id,lang,doSuccess,doError) {
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/materials/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all material ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterials = function(doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/materials',doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get material object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/materials}
	 * @param {object|number} materials - Material ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMaterialsByID = function(materials,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/materials?ids='+this.stringifyArray(materials)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get mini by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @param {number} id - Mini ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMini = function(id,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/minis/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all mini ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMinis = function(lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/minis?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of mini objects by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/minis}
	 * @param {object|string} ids - List of mini ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getMinisByID = function(ids,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/minis?ids='+this.stringifyArray(ids)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get map of all objective names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/wvw/objective_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getObjectiveNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/wvw/objective_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get PVP game by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {number} id - PVP game ID
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGame = function(id,apiKey,doSuccess,doError,version) {
		_getJSON('https://api.guildwars2.com/v2/pvp/games?ids='+id+'&access_token='+apiKey,function(data) {
			_onSuccess(doSuccess,data[0]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get PVP games from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGames = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/pvp/games?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get pvp game object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/games}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {object|number} games - Game object ID(s)
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpGamesByID = function(games,apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/pvp/games?ids='+this.stringifyArray(games)+'&access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get PVP stats from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/pvp/stats}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getPvpStats = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/pvp/stats?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get wallet from account
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/account/wallet}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API-Key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getAccountWallet = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/account/wallet?access_token='+apiKey,doSuccess,doError);
		return this;
	};

	
	/**
	 * @description Get Quaggan object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {number} id - Quaggan ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggan = function(id,doSuccess,doError) {
		if (typeof id != 'string') return this;
		_getJSON('https://api.guildwars2.com/v2/quaggans/'+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get map of all Quaggan image ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggans = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/quaggans',doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get quaggan resource object(s) by ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/quaggans}
	 * @param {object|string} quaggans - Quaggan ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getQuaggansByID = function(quaggans,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/quaggans?ids='+this.stringifyArray(quaggans),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get recipe object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/recipe_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes}
	 * @param {number} id - Recipe ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipe = function(id,lang,doSuccess,doError,version) {
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		if (typeof version != 'number') version = 1;
		var url = 'https://api.guildwars2.com/v1/recipe_details.json?recipe_id='+id+'&lang='+lang;
		switch (version) {
			case 2: url = 'https://api.guildwars2.com/v2/recipes/'+id+'?lang='+lang; break;
		}
		_getJSON(url,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of recipe ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/recipes}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipes = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v1/recipes.json',function(data) {
			_onSuccess(doSuccess,data['recipes']);
		},doError);
		return this;
	};
	
	/**
	 * @description Get recipe object(s) by ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes}
	 * @param {object|number} recipes - Recipe ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipesByID = function(recipes,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/recipes?ids='+this.stringifyArray(recipes)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get recipe search result object based on method and ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/recipes/search}
	 * @param {string} method - Search method (input|output)
	 * @param {number} id - Item ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getRecipeSearch = function(method,id,lang,doSuccess,doError) {
		if (typeof method != 'string') return this;
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/recipes/search?'+method+'='+id+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get render URL
	 * @param {string} signature - File signature
	 * @param {number} id - File ID
	 * @param {string} format - File format
	 * @returns {string} Render URL
	 */
	this.getRenderURL = function(signature,id,format) {
		if (typeof signature != 'string') return '';
		if (typeof id != 'number') return '';
		if (typeof format != 'string') return '';
		return 'https://render.guildwars2.com/file/'+signature+'/'+id+'.'+format;
	};
	
	/**
	 * @description Get skin object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skin_details}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @param {number} id - Skin ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkin = function(id,lang,doSuccess,doError,version) {
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		var url = 'https://api.guildwars2.com/v1/skin_details.json?skin_id='+id+'&lang='+lang;
		switch (version) {
			case 2: url = 'https://api.guildwars2.com/v2/skins/'+id+'?lang='+lang; break;
		}
		_getJSON(url,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all skin ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skins}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @param {number} version - API version (1|2)
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkins = function(doSuccess,doError,version) {
		if (typeof version != 'number') version = 1;
		switch (version) {
			case 1:
				_getJSON('https://api.guildwars2.com/v1/skins.json',function(data) {
					_onSuccess(doSuccess,data['skins']);
				},doError);
			break;
			case 2:
				_getJSON('https://api.guildwars2.com/v2/skins',doSuccess,doError);
			break;
		}
		return this;
	};
	
	/**
	 * @description Get skin object(s) by ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/skins}
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/skins}
	 * @param {object|number} id - Skin ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSkinsByID = function(skins,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/skins?ids='+this.stringifyArray(skins)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get specialization by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @param {number} id - Specialization ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecialization = function(id,lang,doSuccess,doError,version) {
		_getJSON('https://api.guildwars2.com/v2/specializations/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of specialization ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecializations = function(lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/specializations?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get specialization object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/specializations}
	 * @param {object|string} specializations - Array of specialization ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getSpecializationsByID = function(specializations,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/specializations?ids='+this.stringifyArray(specializations)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get tile URL
	 * @param {number} id - Tile ID
	 * @param {number} floor - Floor ID
	 * @param {number} zoom - Zoom factor
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 * @param {number} alias - Domain alias
	 * @returns {string} Tile URL
	 */
	this.getTileURL = function(id,floor,zoom,x,y,alias) {
		if (typeof id != 'number') return '';
		if (typeof floor != 'number') floor = 1;
		if (typeof zoom != 'number') zoom = 1;
		if (typeof x != 'number') x = 1;
		if (typeof y != 'number') y = 1;
		if (typeof alias != 'number' || parseInt(alias) < 1) alias = '';
		return 'https://tiles'+alias+'.guildwars2.com/'+id+'/'+floor+'/'+zoom+'/'+x+'/'+y+'.jpg';
	};
	
	/**
	 * @description Get token info object
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/tokeninfo}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @param {string} apiKey - API key
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTokeninfo = function(apiKey,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/tokeninfo?access_token='+apiKey,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trade listing object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/listings}
	 * @param {number} id - Trade listing ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeListing = function(id,doSuccess,doError) {
		if (typeof id != 'number') return this;
		_getJSON('https://api.guildwars2.com/v2/commerce/listings/'+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trade listing map by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/listings}
	 * @param {object|number} items - Item ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeListings = function(items,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/commerce/listings?ids='+this.stringifyArray(items),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trade price object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/prices}
	 * @param {number} id - Item ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradePrice = function(id,doSuccess,doError) {
		if (typeof id != 'number') return this;
		_getJSON('https://api.guildwars2.com/v2/commerce/prices/'+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trade prices map by given list of ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/prices}
	 * @param {object|number} items - Item ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradePrices = function(items,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/commerce/prices?ids='+this.stringifyArray(items),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trade transactions map by category and type
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/commerce/transactions}
	 * @see {@link https://account.guildwars2.com/account/api-keys}
	 * @see {@link http://jsfiddle.net/cisco211/wod5n811}
	 * @param {string} apiKey - API key
	 * @param {string} category - Transaction category (current|history)
	 * @param {string} type - Transaction type (buy|sell)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTradeTransactions = function(apiKey,category,type,doSuccess,doError) {
		apiKey = apiKey || '';
		category = category || false;
		type = type || false;
		_getJSON('https://api.guildwars2.com/v2/commerce/transactions'+(!category?'':'/'+category)+(!type?'':'/'+type)+'?page=0&page_size=200&access_token='+apiKey,doSuccess,doError);
		return this;
	}
	
	/**
	 * @description Get trait by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @param {number} id - Trait ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTrait = function(id,lang,doSuccess,doError,version) {
		_getJSON('https://api.guildwars2.com/v2/traits/'+id+'?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of trait ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTraits = function(lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/traits?lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get trait object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/traits}
	 * @param {object|string} traits - Array of trait ID(s)
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getTraitsByID = function(traits,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/traits?ids='+this.stringifyArray(traits)+'&lang='+lang,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get world object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @param {number} id - World ID
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorld = function(id,lang,doSuccess,doError) {
		if (typeof id != 'number') return this;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/worlds?lang='+lang+'&ids='+id,function(data) {
			_onSuccess(doSuccess,data[0]);
		},doError);
		return this;
	};
	
	/**
	 * @description Get list of all world ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorlds = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/worlds',doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get map of worlds by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @param {object} worlds - List of world ID's
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldsByID = function(worlds,lang,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/worlds?lang='+lang+'&ids='+this.stringifyArray(worlds),function(data) {
			var optimized = {};
			for (var key in data) optimized[data[key]['id']] = data[key];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get map of worlds by page
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/worlds}
	 * @param {number} page - Page number
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldsByPage = function(page,lang,doSuccess,doError) {
		if (typeof page != 'number') page = 0;
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v2/worlds?lang='+lang+'&page='+page,function(data) {
			var optimized = {};
			for (var key in data) optimized[data[key]['id']] = data[key];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get map of world names
	 * @see {@link https://wiki.guildwars2.com/wiki/API:1/world_names}
	 * @param {string} lang - Language keyword (en|de|es|fr)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWorldNames = function(lang,doSuccess,doError) {
		if (typeof lang != 'string') lang = 'en';
		_getJSON('https://api.guildwars2.com/v1/world_names.json?lang='+lang,function(data) {
			var optimized = {};
			for (var i = 0; i < data.length; i++) optimized[data[i]['id']] = data[i]['name'];
			_onSuccess(doSuccess,optimized);
		},doError);
		return this;
	};
	
	/**
	 * @description Get wvw match object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @param {number} id - WvW match ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatch = function(id,doSuccess,doError) {
		if (typeof id == 'number') _getJSON('https://api.guildwars2.com/v2/wvw/matches?world='+id,doSuccess,doError);
		else if (typeof id == 'string') _getJSON('https://api.guildwars2.com/v2/wvw/matches?id='+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all wvw match ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatches = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/wvw/matches',doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get wvw match object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/matches}
	 * @param {object|number} ids - WvW match ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWMatchesByID = function(ids,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/wvw/matches?ids='+this.stringifyArray(ids),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get wvw objectives object by ID
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @param {number} id - WvW objectives ID
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjective = function(id,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/wvw/objectives/'+id,doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get list of all wvw objectives ID's
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjectives = function(doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/wvw/objectives',doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Get wvw objectives object(s) from ID(s)
	 * @see {@link https://wiki.guildwars2.com/wiki/API:2/wvw/objectives}
	 * @param {object|number} ids - WvW objectives ID(s)
	 * @param {function} doSuccess - Callback function for success
	 * @param {function} doError - Callback function for error
	 * @returns {object} Current FW_GW2 object instance
	 */
	this.getWvWObjectivesByID = function(ids,doSuccess,doError) {
		_getJSON('https://api.guildwars2.com/v2/wvw/objectives?ids='+this.stringifyArray(ids),doSuccess,doError);
		return this;
	};
	
	/**
	 * @description Stringify array
	 * @param {object} array - The array
	 * @returns {string} Stringified array
	 */
	this.stringifyArray = function(array) {
		if (typeof array == 'undefined') return '';
		if (typeof array == 'string') return array;
		if (typeof array != 'object') return array;
		var ids = '';
		for (var i = 0; i < array.length; i++) ids += ','+encodeURI(array[i]);
		return ids.substr(1);
	};
	
	/**
	 * @description Convert number to object for gold, silver and copper 
	 * @param {number} n - The number
	 * @returns {object} Object with gold, silver and copper values
	 */
	this.toCoins = function(n) {
		n = n || 0;
		var c = n % 100;
		n = (n - c) / 100;
		var s = n % 100;
		var g = (n - s) / 100;
		return {'copper':c,'silver':s,'gold':g};
	};
	
	/**
	 * @description Convert number to HTML code for gold, silver and copper 
	 * @param {number} n - The number
	 * @param {object} c - Image configuration
	 * @returns {string} HTML code to display coins
	 */
	this.toHTMLCoins = function(n,c) {
		n = n || 0;
		c = c || {};
		c.gold = c.gold || FW_GW2$ImageData.gold;
		c.silver = c.silver || FW_GW2$ImageData.silver;
		c.copper = c.copper || FW_GW2$ImageData.copper;
		var money = this.toCoins(n);
		var output = '<span class="money">';
		if (money['gold'] > 0) output += '<span class="gold">'+money['gold']+'<img width="10" height="10" alt="Gold" src="'+c.gold+'"/></span> ';
		if (money['gold'] > 0 || money['silver'] > 0) output += '<span class="silver">'+money['silver']+'<img width="10" height="10" alt="Silver" src="'+c.silver+'"/></span> ';
		output += '<span class="copper">'+money['copper']+'<img width="10" height="10" alt="Copper" src="'+c.copper+'"/></span>';
		output += '</span>';
		return output;
	};
	
	/**
	 * @description Convert number to HTML code for gems
	 * @param {number} n - The number
	 * @param {object} c - Image configuration
	 * @returns {string} HTML code to display gems
	 */
	this.toHTMLGems = function(n,c) {
		n = n || 0;
		c = c || {};
		c.gem = c.gem || FW_GW2$ImageData.gem;
		return '<span class="gems">'+n+'<img width="12" height="11" alt="Gems" src="'+c.gem+'"/></span>';
	};
	
	/**
	 * @description Convert numbers of gold, silver and copper to one number value
	 * @param {number} g - Amount of gold
	 * @param {number} s - Amount of silver
	 * @param {number} c - Amount of copper
	 * @returns {number} The integer of gold, silver and copper values
	 */
	this.toInteger = function(g,s,c) {
		g = g || 0;
		s = s || 0;
		c = c || 0;
		var n = 0;
		n += c;
		n += (s*100);
		n += (g*10000);
		return n;
	};
};