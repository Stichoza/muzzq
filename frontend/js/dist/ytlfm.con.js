/**
 * TouTube API Wrapper
 * @author Stichoza <me@stichoza.com>
 */
function YouTube() {
	this.video = {
		id: null,
		title: null,
		duration: 0,
		currentTime: 0,
		startByte: 0,
		bytesTotal: 0,
		bytesLoaded: 0
	};
	this.instance = null;
}

YouTube.prototype.initYouTube = function(elementId) {
	var youtubeJsApi = "http://www.youtube.com/apiplayer?enablejsapi=1&version=3";
	var youtubeNinja = elementId || "youtube";
	var params = {
		allowScriptAccess: "always"
	};
	var attribs = {
		id: "xyoutube"
	};
	swfobject.embedSWF(youtubeJsApi, youtubeNinja, "425", "356", "8", null, null, params, attribs);
	setTimeout(function () {
		console.log($(".fc-panel"));
		$(".fc-panel").click();
	}, 100);
};

YouTube.prototype.playSearched = function (query, index, startSeconds) {
	var ind = index || 0;
	var sec = startSeconds || 0;
	this.instance.loadPlaylist({
		list: query,
		listType: "search",
		index: ind,
		startSeconds: sec
	});
};

YouTube.prototype.onStateChange = function (newState) {
   console.log("Player state changed: " + newState);
};

/**
 * Implement API method
 */
function onYouTubePlayerReady(playerId) {
	console.log("YouTube Player loaded" + (playerId ? ": " + playerId : ""));
	yt.instance = document.getElementById("xyoutube");
	yt.instance.addEventListener("onStateChange", yt.onStateChange);
};


/**
 * Last,FM API Wrapper
 * @author Stichoza <me@stichoza.com>
 */

function LastFm() {
	var api = {
		key: "bd044519c318454f28ef92d641f7e55f",
		url: "http://ws.audioscrobbler.com/2.0/"
	};
}

LastFm.prototype.basicAjax = function(method, data) {
	
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
};

LastFm.prototype.searchArtist = function(artist) {
	$.ajax();
};
var yt = new YouTube();
yt.initYouTube("youtube-ninja");

var lf = new LastFm();

/*$('#artist').typeahead({

    source: function (query, process) {
        return $.getJSON(
            'path/to/lookup',
            { query: query },
            function (data) {
                return process(data);
            });
    }

});*/

$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});