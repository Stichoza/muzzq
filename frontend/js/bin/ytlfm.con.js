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
var yt = new YouTube();
yt.initYouTube("youtube-ninja");

/**
 * TT artist
 */
$('#artist').typeahead({
	name: 'artists',
	remote: {
		cache: true,
		url: LastFm.api.url
			+ "?method=artist.search&format=json&api_key="
			+ LastFm.api.key
			+ "&artist=%QUERY&limit=5",
		filter: function(parsedResponse) {
			var result = [];
			$.each(parsedResponse.results.artistmatches.artist, function(i, val) {
				result.push({
					name: val["name"],
					listeners: val["listeners"],
					mbid: val["mbid"],
					thumb: (!!val["image"] && val["image"][1]["#text"] != "")
						? val["image"][1]["#text"]
						: "//placehold.it/42x42",
					image: (!!val["image"] && val["image"][3]["#text"] != "")
						? val["image"][3]["#text"]
						: "none"
				});
			});
			return result;
		}
	},
	template: [
		'<div class="pull-left clearfix thumbnail tt-artist-img" ',
		'style="background-image:url({{thumb}})"></div>',
		'<span class="tt-artist-name">{{name}}</span>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});

/**
 * TT events
 */
$('#artist').on('typeahead:selected', function (object, datum) {
	console.log(datum);
	if (datum.image != "none") {
		$(this).addClass("tt-selected").css({
			'background-image': 'url(' + datum.image + ')'
		});
	}
	$("#track").focus();
}).on('click focus mousedown', function () {
	$(this).removeClass("tt-selected").css({
		'background-image': 'none'
	});
});
/**
 * TT tracks
 */
$('#track').typeahead({
	name: 'tracks',
	remote: {
		cache: true,
		url: LastFm.api.url
			+ "?method=track.search&format=json&api_key="
			+ LastFm.api.key
			+ "&track=%QUERY&artist=%ARTIST&limit=5"
			+ $("#artist").val(),
		filter: function(parsedResponse) {
			var result = [];
			$.each(parsedResponse.results.trackmatches.track, function(i, val) {
				result.push({
					name: val["name"],
					artist: val["artist"],
					mbid: val["mbid"],
					listeners: val["listeners"],
					thumb: (!!val["image"] && val["image"][1]["#text"] != "")
						? val["image"][1]["#text"]
						: "//placehold.it/42x42",
					image: (!!val["image"] && val["image"][3]["#text"] != "")
						? val["image"][3]["#text"]
						: "none"
				});
			});
			return result;
		},
		replace: function (url, uriEncodedQuery) {
			url = url.replace("%ARTIST", $("#artist").val());
			return url.replace("%QUERY", uriEncodedQuery);
		}
	},
	template: [
		'<div class="pull-left clearfix thumbnail tt-track-img" ',
		'style="background-image:url({{thumb}})"></div>',
		'<span class="tt-track-name">{{name}}</span>',
		'<span class="tt-track-by-name">by <b>{{artist}}</b></span>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});

/**
 * TT events
 */
$('#track').on('typeahead:selected', function (object, datum) {
	console.log(datum);
	if (datum.image != "none") {
		$(this).addClass("tt-selected").css({
			'background-image': 'url(' + datum.image + ')'
		});
	}
	$("#listen button").focus();
}).on('click focus mousedown', function () {
	$(this).removeClass("tt-selected").css({
		'background-image': 'none'
	});
});



$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});