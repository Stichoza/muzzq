/**
 * Last,FM API Wrapper
 * @author Stichoza <me@stichoza.com>
 */

var LastFm = {
	api: {
		key: "bd044519c318454f28ef92d641f7e55f",
		url: "http://ws.audioscrobbler.com/2.0/"
	},
	
	basicAjax: function(method, data) {
		data["method"] = method;
		data["format"] = "json";
		data["api_key"] = this.api.key;
		var options = {
			url: this.api.url,
			method: 'GET',
			data: data,
			async: true,
			cache: false,
			success: function(r) {
				console.log(r);
			},
			error: function(e) {
				console.warn(e);
			}
		};
		options = $.extend(options, data || {});
		$.ajax(options);
	},

	searchArtist: function(artist) {
		$.ajax();
	}

};