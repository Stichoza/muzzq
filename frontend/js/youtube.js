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
	var youtubeNinja = elementId | "youtube";
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
	var ind = index | 0;
	var sec = startSeconds | 0;
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
	yt.playSearched(window.prompt("What would you like to listen?"));
};

