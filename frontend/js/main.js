var yt = new YouTube();
yt.initYouTube("youtube-ninja");

/*$('#artist').typeahead({
	name: 'artists',
	remote: LastFm.api.url
		+ "?method=artist.search&format=json&api_key="
		+ LastFm.api.key
		+ "&artist=%QUERY",
	template: [
		'<p class="artist">

		{{^results}}
			{{#artistmatches}}
				{{artist{{name}}}}
			{{/artistmatches}}
		{{/results}}

		</p>',
		'<p class="repo-name"></p>',
		'<p class="repo-description"></p>'
	].join(''),
	valueKey: 'name',
	engine: Hogan
});*/

$("#listen").submit(function(e) {
	e.preventDefault();
	yt.playSearched($("#artist").val() + " " + $("#track").val());
});