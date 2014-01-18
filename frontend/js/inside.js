var yt = new YouTube();
yt.initYouTube("youtube-ninja");

$('#artist').typeahead({
	name: 'artists',
	remote: {
		url: LastFm.api.url
			+ "?method=artist.search&format=json&api_key="
			+ LastFm.api.key
			+ "&artist=%QUERY",
		filter: function(response) {
			var result = [];
			$.each(response.results.artistmatches.artist, function(i, val) {
				result.push({
					name: val["name"],
					listeners: val["listeners"],
					image: val["image"][3]["#text"]
				});
			});
			return result;
		}
	},
	template: [
		'<div class="tt-artist-img" ',
		'style="background-image:url({{image}})"></div>',
		'<div class="tt-artist-name">{{name}}</div>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});

$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});