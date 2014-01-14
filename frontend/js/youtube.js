

function onYouTubePlayerReady(playerId) {
	console.log("YouTube Player loaded" + (playerId ? ": " + playerId : ""));
	yt.instance = document.getElementById("xyoutube");
	yt.instance.addEventListener("onStateChange", "onYouTubePlayerStateChange");
	yt.playSearched(prompt("What would you like to listen?"));
}

function onYouTubePlayerStateChange(newState) {
   console.log("Player state changed: " + newState);
}

/**
 * TouTube API Wrapper
 * @author Stichoza <me@stichoza.com>
 */

function YouTube() {
	this.instance = null;
};

YouTube.prototype.initYouTube = function() {
	var youtubeJsApi = "http://www.youtube.com/apiplayer?enablejsapi=1&version=3";
	var youtubeNinja = "youtube-ninja";
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
	var index = index | 0;
	var sec = sec | 0;
	this.instance.loadPlaylist({
		list: query,
		listType: "search",
		index: index,
		startSeconds: startSeconds
	});
}

var yt = new YouTube();
yt.initYouTube();

