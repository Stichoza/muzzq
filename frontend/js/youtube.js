var youtube = -5;

function initYouTube() {
	var youtubeJsApi = "http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=youtube";
	var youtubeNinja = "youtube-ninja";
	var params = {
		allowScriptAccess: "always"
	};
    var attribs = {
    	id: "xyoutube"
    };
    swfobject.embedSWF(youtubeJsApi, youtubeNinja, "425", "356", "8", null, null, params, attribs);
}

function onYouTubePlayerReady(playerId) {
	youtube = document.getElementById(playerId);
	console.log("YouTube Player loaded: " + playerId);

}